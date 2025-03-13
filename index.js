require('dotenv').config();

const port = process.env.PORT || 3000;

const express = require('express');
const session = require('express-session');
const LokiStore = require('connect-loki')(session);
const app = express();

const db = require('./db.js');

app.set('trust proxy', 1);

let secret = process.env.SECRET || 'keyboard cat';
app.use(session({
    secret,
    cookie: {
        maxAge: 60 * 60 * 1000 * 24 * 30 // 30 days
    },
    saveUninitialized: true,
    resave: false,

    store: new LokiStore({
        path: "./sessions.db",
        logErrors: true
    }),

    name: 'freehost'
}));

app.use(express.json());

let requestCount = 0;
app.use((req, res, next) => {
    requestCount++;
    console.log(`[${String(requestCount).padStart(6, '0')}] [${req.ip}] ${req.method} ${req.url}`);
    next();
});

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