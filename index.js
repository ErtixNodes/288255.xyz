require('dotenv').config();

const port = process.env.PORT || 3000;

const express = require('express');
const app = express();

const db = require('./db.js');

app.use(require('./landing.js'));
app.use('/dash', require('./dash.js'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

setInterval(async () => {
    let nodes = await db.Node.find();
    for (let node of nodes) {
        // Update node status
        node.serverCount = await db.Server.countDocuments({ node: node.code });
        node.percentage = (node.serverCount / node.serverLimit) * 100;
        node.percentage = Math.round(node.percentage);
        
        node.isFull = node.serverCount >= node.serverLimit;
        
        await node.save();
    }
}, 5 * 1000);