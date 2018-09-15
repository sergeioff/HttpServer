const path = require('path');
const express = require('express');
const multer = require('multer');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
  
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
});

const upload = multer({storage: storage});

const app = express();

app.post('/uploadfile', upload.single('file'), (req, res, next) => {
    res.send('<h2>File uploaded</h2>');
})

app.get('/', (req, res) => {
    res.send(`<form action="/uploadfile" method="post" enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="submit" value="send" />
    </form>`);
})

app.listen(8080, () => {
    console.log('Listening on port 8080!');
})
