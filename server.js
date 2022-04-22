//const express = require('express');
import express from 'express';
import { listFiles, printFileOrFolder } from './functions.js'

const app = express();
const port = 3000;
const path = "/home/mariedemeter/Bureau/";

app.use(express.static('frontend'))

app.get('/api/drive/', (req, res) => {
    listFiles(path)
        .then(files => res.status(200).type('application/json').send(files))
        .catch(err=>console.log(err.message))
});

app.get('/api/drive/:name', (req, res) => {
    printFileOrFolder(req, res, path)
        .catch(err => res.status(404).send('Erreur 404', err.message));
})

function startServeur() {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    })
};





// Avec require 
// exports.startServeur = startServeur;
// Avec import, export
export { startServeur };