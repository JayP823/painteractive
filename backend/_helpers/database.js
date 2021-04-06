const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL || config.connectionString, {useCreateIndex: true, useNewUrlParser: true});

module.exports = {
    User: require('../models/user.model'),
    Post: require('../models/post.model')
}