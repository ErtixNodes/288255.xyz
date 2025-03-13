require('dotenv').config();

const port = process.env.PORT || 3000;

const express = require('express');
const app = express();

app.use(require('./landing.js'));
app.use('/dash', require('./dash.js'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});