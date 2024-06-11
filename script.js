const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let painting = false;
let coordinates = [];

















// Drawing functionality
function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
    coordinates.push(null); // Mark the end of a line segment
}

function draw(e) {
    if (!painting) return;
    ctx.lineWidth = document.getElementById('lineWidth').value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = document.getElementById('colorPicker').value;

    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Record coordinates
    coordinates.push({ x, y });
}

// G-code generation
// G-code generation
function generateGCode(coordinates) {
    let gcode = "G21 F1500\n";
    let firstMove = true;

    for (let i = 0; i < coordinates.length; i++) {
        const point = coordinates[i];

        if (point) {
            const command = firstMove ? ['G0','M3 S40'] : ['G1',''];
            gcode += `${command[0]} X${(point.x / 5).toFixed(2)} Y${(-point.y / 5).toFixed(2)}\n${command[1]}\n`;
            firstMove = false;
        } else {
            if (i < coordinates.length - 1 && coordinates[i + 1]) {
                // Insert M3 and G0 commands before moving to the next segment
                gcode += "M5\n";
                gcode += `G0 X${(coordinates[i + 1].x /5).toFixed(2)} Y${-(coordinates[i + 1].y /5).toFixed(2)}\n`;
                gcode += "M3\n";
            }
            firstMove = true;
        }
    }

    gcode += "M5 ; Program end\n M30";
    return gcode;
}


// Download G-code
function downloadGCode(gcode) {
    const blob = new Blob([gcode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drawing.gcode';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

// Clear canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    coordinates = []; // Clear coordinates
}

// Display G-code
function displayGCode(gcode) {
    document.getElementById('gcodeOutput').textContent = gcode;
}

// Simulate G-code
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
                ctx.moveTo(x, -y);
            } else if (line.startsWith('G1')) {
                ctx.lineTo(x, -y);
                ctx.stroke();
            }

            currentX = x;
            currentY = -y;
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
            currentY = -y;
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

document.getElementById('clearButton').addEventListener('click', () => {
    if (confirm('確定要清除畫布嗎？這將清除所有繪畫和座標記錄。')) {
        clearCanvas();
    }
});
document.getElementById('downloadGcodeButton').addEventListener('click', () => {
    const gcode = generateGCode(coordinates);
    downloadGCode(gcode);
});
document.getElementById('uploadGcode').addEventListener('change', handleFileUpload);
