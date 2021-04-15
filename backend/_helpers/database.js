const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString, {useCreateIndex: true, useNewUrlParser: true})
const db = mongoose.connection;
const Grid = require('gridfs-stream');

let gfs;

module.exports = 
    new Promise(function(resolve, reject){
        db.once('open', () => {
            gfs = Grid(db.db, mongoose.mongo);
            gfs.collection('uploads');
            let newJson = {
                gfs: gfs, 
                conn: db, 
                User: require('../models/user.model'),
                Post: require('../models/post.model')}
            resolve(newJson);
        });
    })