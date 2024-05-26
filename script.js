window.addEventListener('load', () => {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const lineWidth = document.getElementById('lineWidth');
    const clearButton = document.getElementById('clearButton');
    const coordinates = document.getElementById('coordinates');
    const downloadGcodeButton = document.getElementById('downloadGcodeButton');
    const uploadGcode = document.getElementById('uploadGcode');
    const svg2gcodefile = document.getElementById('runpythonscript');


    let painting = false;
    let coordinatesList = [];

    function runpythonscript() {
        // Get the path to the Python script.
        var pythonScriptPath = "/Users/lukelaitw/NTU/webcarcar/svg2gcode.py";
        c = svg2gcodefile
        subprocess.run(["python", pythonScriptPath]);
    }

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
        coordinatesList.push('End of Path');
        updateCoordinatesDisplay();
    }

    function draw(e) {
        if (!painting) return;

        ctx.lineWidth = lineWidth.value;
        ctx.lineCap = 'round';
        ctx.strokeStyle = colorPicker.value;

        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);

        coordinatesList.push(`(${x}, ${y})`);
    }

    function updateCoordinatesDisplay() {
        coordinates.value = coordinatesList.join('\n');
    }

    function convertToGcode() {
        let gcode = [];
        let isDrawing = false;

        for (let coordinate of coordinatesList) {
            if (coordinate === 'End of Path') {
                isDrawing = false;
            } else {
                const [x, y] = coordinate.replace(/[()]/g, '').split(',').map(Number);
                if (!isDrawing) {
                    gcode.push(`G0 X${x} Y${y}`);
                    isDrawing = true;
                } else {
                    gcode.push(`G1 X${x} Y${y}`);
                }
            }
        }

        gcode.push('M30'); // 程序結束
        return gcode.join('\n');
    }

    function downloadGcode() {
        const gcode = convertToGcode();
        const blob = new Blob([gcode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'drawing.gcode';
        a.click();
        URL.revokeObjectURL(url);
    }

    function simulateGcode(gcode) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        let currentX = 0;
        let currentY = 0;
        let units = 'mm';  // Default units
    
        ctx.beginPath();
        for (let line of gcode) {
            if (line.startsWith('M2')) {
                break; // End of program, stop processing further commands
            }
            if (line.startsWith('G20')) {
                units = 'inches';  // Set units to inches
                continue;
            }
            if (line.startsWith('G21')) {
                units = 'mm';  // Set units to millimeters
                continue;
            }
    
            const parts = line.split(' ');
    
            if (line.startsWith('G0') || line.startsWith('G1')) {
                const xPart = parts.find(part => part.startsWith('X'));
                const yPart = parts.find(part => part.startsWith('Y'));
                const x = xPart ? parseFloat(xPart.substring(1)) : currentX;
                const y = yPart ? parseFloat(yPart.substring(1)) : currentY;
                const centery = 270;
                const centerx = 450;
                
                if (line.startsWith('G0')) {
                    ctx.moveTo(x, y);
                } else if (line.startsWith('G1')) {
                    ctx.lineTo(x, y);
                    ctx.stroke();
                }
    
                currentX = x;
                currentY = y;
            } else if (line.startsWith('G2') || line.startsWith('G3')) {
                const xPart = parts.find(part => part.startsWith('X'));
                const yPart = parts.find(part => part.startsWith('Y'));
                const iPart = parts.find(part => part.startsWith('I'));
                const jPart = parts.find(part => part.startsWith('J'));
    
                const x = xPart ? parseFloat(xPart.substring(1)) : currentX;
                const y = yPart ? parseFloat(yPart.substring(1)) : currentY;
                const i = iPart ? parseFloat(iPart.substring(1)) : 0;
                const j = jPart ? parseFloat(jPart.substring(1)) : 0;
    
                const centerX = currentX + i;
                const centerY = currentY + j;
                const radius = Math.sqrt(i * i + j * j);

                const startAngle = Math.atan2(currentY - centerY, currentX - centerX);
                const endAngle = Math.atan2(y - centerY, x - centerX);

                if (line.startsWith('G2')) {
                    // Clockwise arc
                    ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
                } else if (line.startsWith('G3')) {
                    // Counter-clockwise arc
                    ctx.arc(centerX, centerY, radius, startAngle, endAngle, true);
                }

                ctx.stroke();
    
                currentX = x;
                currentY = y;
            }
        }
        ctx.closePath();
    }
    
    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const gcode = e.target.result.split('\n');
                simulateGcode(gcode);
            }
            reader.readAsText(file);
        }
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('touchstart', startPosition);
    canvas.addEventListener('touchend', endPosition);
    canvas.addEventListener('touchmove', draw);

    clearButton.addEventListener('click', () => {
        if (confirm('確定要清除畫布嗎？這將清除所有繪畫和座標記錄。')) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            coordinatesList = [];
            updateCoordinatesDisplay();
        }
    });
    downloadGcodeButton.addEventListener('click', downloadGcode);
    uploadGcode.addEventListener('change', handleFileUpload);
    // Simulate the provided G03 command
    // const sampleGcode = [
    //    'G21',  // Set units to millimeters
    //    'G0 X0 Y0',  // Move to start position
    //    'G03 X25.285601 Y44.235978 I22.448841 J-26.067640',  // Simulate this arc
    //    'M2'  // End of program
    //];

    //simulateGcode(sampleGcode);
});
