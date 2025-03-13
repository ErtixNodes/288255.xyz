const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
    res.send('Welcome to dashboard of 288255.xyz!');
});

module.exports = app;