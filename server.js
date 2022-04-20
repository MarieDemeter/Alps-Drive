//const express = require('express');
import express from 'express';
const app = express();
const port = 3000;

function start() {
    
    app.use(express.static('frontend'))
    
    app.get('/', (req, res) => {
        res.send('Hello World!');
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    })
};

// Avec require 
// exports.start = start;

// Avec import, export
export { start };
