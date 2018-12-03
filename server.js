const path = require('path');
const express = require('express');
const busboy = require('connect-busboy');
const fs = require('fs-extra');
const serveIndex = require('serve-index');

const app = express();
app.use(busboy({
    highWaterMark: 2 * 1024 * 1024
}));

const UPLOAD_DIRECTORY_PATH = path.join(__dirname, 'uploads');
fs.ensureDir(UPLOAD_DIRECTORY_PATH);

const PUBLIC_DIRECTORY = 'public';
fs.ensureDir(path.join(__dirname, PUBLIC_DIRECTORY));

// app.use('/', express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
})

app.get('/dist/bundle.js', (req, res) => {
    res.sendFile('dist/bundle.js', {root: __dirname});
})

app.use(express.static("dist"));


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

    req.busboy.on('close', () => {
        console.log('closed');
    })
});

app.listen(8080, () => {
    console.log('Listening on port 8080!');
})

app.use('/public', express.static(PUBLIC_DIRECTORY), serveIndex(PUBLIC_DIRECTORY));