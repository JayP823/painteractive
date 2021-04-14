const config = require('../config.json');
const mongoose = require('mongoose');
const conn = mongoose.createConnection(config.connectionString, {useCreateIndex: true, useNewUrlParser: true});
const Grid = require('gridfs-stream');

let gfs;
let test = 5;




module.exports = 
    new Promise(function(resolve, reject){
        conn.once('open', () => {
            gfs = Grid(conn.db, mongoose.mongo);
            gfs.collection('uploads');
            let newJson = {gfs: gfs, conn: conn}
            resolve(newJson);
        });
    })