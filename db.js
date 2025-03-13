const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO);

const User = new mongoose.model('User', {
    email: String,
    password: String,
    role: String,
    balance: Number
});

const Server = new mongoose.model('Server', {
    userID: mongoose.Types.ObjectId,
    name: String,
    port: Number,
    node: String
});

const Node = new mongoose.model('Node', {
    code: String,
    ip: String,
    
    serverCount: Number,
    serverLimit: Number,
    percentage: Number,
    
    isFull: Boolean,
    isAvailable: Boolean
});

module.exports = { User, Server, Node };