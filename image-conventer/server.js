const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { promisify } = require('util');
const sharp = require('sharp');
const potrace = require('potrace');
const app = express();
const upload = multer({ dest: 'uploads/' });

const unlinkAsync = promisify(fs.unlink);
const traceAsync = promisify(potrace.trace);

app.use(express.static('public'));

app.post('/upload', upload.single('image'), async (req, res) => {
    const imagePath = req.file.path;
    const processedPath = `uploads/processed_${req.file.filename}.png`;
    const outputFilePath = `uploads/${req.file.filename}.svg`;

    try {
        // Preprocess the image with sharp
        await sharp(imagePath)
            .resize(500, 500, {
                fit: sharp.fit.inside,
                withoutEnlargement: true,
            })
            .toFile(processedPath);

        // Convert to SVG using potrace
        const svg = await traceAsync(processedPath);

        // Write the SVG to a file
        fs.writeFileSync(outputFilePath, svg);

        // Send the SVG file to the client
        res.download(outputFilePath, 'converted.svg', async (err) => {
            if (err) {
                console.error(`download error: ${err}`);
                res.status(500).send('Download Error');
            }

            // Cleanup the files
            await unlinkAsync(imagePath);
            await unlinkAsync(processedPath);
            await unlinkAsync(outputFilePath);
        });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
