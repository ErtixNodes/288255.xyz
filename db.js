const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO);

const User = new mongoose.Model('User', {
    email: String,
    password: String,
    role: String,
    balance: Number
});

const Server = new mongoose.Model('Server', {
    userID: mongoose.Types.ObjectId,
    name: String,
    port: Number,
    node: String
});

module.exports = { User, Server };