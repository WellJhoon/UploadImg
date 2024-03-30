const express = require('express');
const multer = require('multer');
const fs = require('node:fs');

const upload = multer({ dest: 'uploads/' });
const app = express();

app.post('/images/single', upload.single('imagenPerfil'), (req, res) => {
    console.log(req.file);
    saveImg(req.file);
    res.send('File uploaded successfully');
});

app.post('/images/multiple', upload.array('images', 3), (req, res) => {
    console.log(req.files);
    req.files.forEach(saveImg);
    res.send('Files uploaded successfully');
});

function saveImg(file){
    const newPath = `./uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}


app.listen(3000, () => {
    console.log('Server started on port 3000');
});

