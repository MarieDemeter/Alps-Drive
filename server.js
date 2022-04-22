//const express = require('express');
import express from 'express';
import {listFiles} from './functions.js'

const app = express();
const port = 3000;

app.use(express.static('frontend'))

app.get('/api/drive/', (req, res) => {
    const path = "./AlpsDrive/";
    listFiles(path)
        .then(files => res.status(200).type('application/json').send(files))

    
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