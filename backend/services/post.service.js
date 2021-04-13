var express = require('express');
const mongo = require('mongodb');
const db = require('../_helpers/database');
var Grid = require('gridfs-stream');
const gfs = Grid(db, mongo);
var app = express();

module.exports = {
    upload
}

async function upload(image){
    var writeStream = gfs.createWriteStream({
        filenale: 'file_name_here'
    });
    writeStream.on('close', function(file){
        res.send(`File has been uploaded ${file._id}`);
    });
    req.pipe(writeStream);
}