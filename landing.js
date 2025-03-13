const express = require('express');
const path = require('path');
const app = express.Router();

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.send('Welcome to 288255.xyz!');
});

module.exports = app;