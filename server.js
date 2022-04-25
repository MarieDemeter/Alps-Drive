//const express = require('express');
import express from 'express';
import { listFiles, isFolder , createDirectory} from './functions.js'

const app = express();
const port = 3000;
const path = "/home/mariedemeter/Bureau/";

app.use(express.static('frontend'))

app.get('/api/drive/', (req, res) => {
    listFiles(path)
        .then(files => res.status(200).type('application/json').send(files))
        .catch(err => console.log(err.message))
});

app.get('/api/drive/:name', (req, res) => {
    isFolder(path + req.params.name)
        .then(isFolder => {
            if (isFolder) {
                listFiles(path + req.params.name + "/")
                    .then(nextFiles => res.status(200).type('application/json').send(nextFiles))
                    .catch(err => console.log(err.message))
            } else {
                console.log('not a directory upload the file');
                console.log(path + req.params.name);
                res.status(200).type('application/octet-stream').sendFile(path + req.params.name);
            }
        })
        .catch (err => res.status(404).send('Erreur 404', err.message));
});

app.post('/api/drive', (req, res) => {
    createDirectory(path)
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