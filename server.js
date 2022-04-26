//const express = require('express');
import express from 'express';
import { listDirectory, isFolder, createDirectory, deleteFileOrDirectory, uploadFile } from './functions.js';
import fileUpload from 'express-fileupload';
import os from 'os';

const app = express();
const port = 3000;
//const path = "/home/mariedemeter/Bureau/";
const path = os.tmpdir() + '/backend/';


app.use(express.static('frontend'));

app.use(fileUpload({
    //    useTempFiles : true,
    //    tempFileDir : '/tmp/'
    headers: 'multipart/form-data'
}));

app.get('/api/drive/', (req, res) => {
    listDirectory(path)
        .then(files => res.status(200).type('application/json').send(files))
        .catch(err => console.log(err.message))
});

app.get('/api/drive/:name', (req, res) => {
    isFolder(path + req.params.name)
        .then(isFolder => {
            if (isFolder) {
                listDirectory(path + req.params.name + "/")
                    .then(nextFiles => res.status(200).type('application/json').send(nextFiles))
                    .catch(err => console.log(err.message))
            } else {
                res.status(200).type('application/octet-stream').sendFile(path + req.params.name);
            }
        })
        .catch(err => res.status(404).send('Erreur 404' + err.message));
});

app.post('/api/drive/', (req, res) => {
    createDirectory(path, req.query.name)
        .then(newDirectory => res.status(200).send(newDirectory))
        .catch(err => res.status(400).send('Erreur 400' + err.message));
});

app.post('/api/drive/:name', (req, res) => {
    createDirectory(path + req.params.name + '/', req.query.name)
        .then(newDirectory => res.status(200).send(newDirectory))
        .catch(err => res.status(400).send('Erreur 400 ' + err.message));
});

app.delete('/api/drive/:name', (req, res) => {
    deleteFileOrDirectory(path, req.params.name)
        .then(objToDelete => res.status(200).send(objToDelete))
        .catch(err => res.status(400).send('Erreur 400 ' + err.message));
});

app.delete('/api/drive/:folder/:name', (req, res) => {
    deleteFileOrDirectory(path + req.params.folder + '/', req.params.name)
        .then(objToDelete => res.status(200).send(objToDelete))
        .catch(err => res.status(400).send('Erreur 400 ' + err.message));
});

app.put('/api/drive/', (req, res) => {
    uploadFile(path, req.files.file)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(400).send('Erreur 400 ' + err.message));
});

app.put('/api/drive/:folder', (req, res) => {
    uploadFile(path + req.params.folder + '/', req.files.file)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(400).send('Erreur 400 ' + err.message));
});

function startServeur() {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    })
};





// Avec require 
// exports.startServeur = startServeur;
// Avec import, export
export { startServeur };