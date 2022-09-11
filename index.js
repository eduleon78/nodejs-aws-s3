import express from "express";
import fileUpload from "express-fileupload";
import { uploadFile, getFiles, getFile, downloadFile, getFileUrl } from './s3.js'

import './config.js'

const app = express();

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));

app.get('/files', async (req, res) => {
    const result = await getFiles()
    res.json(result.Contents);
})

app.get('/files/:fileName', async (req, res) => {
    const result = await getFileUrl(req.params.fileName)
    res.json({
        url: result
    })
})

app.get('/downloadfile/:fileName', async (req, res) => {
    await downloadFile(req.params.fileName)
    res.json({message: "Archivo descargado"})
})

app.post('/files', async(req, res) => {
    const result = await uploadFile(req.files.file)
    res.json({ result });
})

app.use(express.static('images'));

app.listen(3000)
console.log(`listen on port ${3000}`);