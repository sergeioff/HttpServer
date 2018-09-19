const path = require('path');
const express = require('express');
const busboy = require('connect-busboy');
const fs = require('fs-extra');

const app = express();
app.use(busboy({
    highWaterMark: 2 * 1024 * 1024
}));

const UPLOAD_DIRECTORY_PATH = path.join(__dirname, 'uploads');
fs.ensureDir(UPLOAD_DIRECTORY_PATH);

app.get('/', (req, res) => {
    res.send(`<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="submit" value="send" />
    </form>`);
})


app.post('/upload', (req, res) => {
    req.pipe(req.busboy);

    req.busboy.on('file', (fieldname, file, filename) => {
        console.log(`Started upload of: ${filename}`);

        const fstream = fs.createWriteStream(path.join(UPLOAD_DIRECTORY_PATH, filename));
        file.pipe(fstream);

        fstream.on('close', () => {
            console.log(`Finished upload of ${filename}`);
            res.send('File uploaded!');
        });
    });
});

app.listen(8080, () => {
    console.log('Listening on port 8080!');
})

app.use('/public', express.static('public'));