const { resolve } = require('path');

module.exports = {
    createPost,
    getPostInfo,
    showImage,
    getAllPostInfo
}

async function createPost(req, file) {
    var func = require('../_helpers/database');
    let gfs, Post;
    let resp = {};
    await func.then((gfsConn) => {
        gfs = gfsConn.gfs;
        Post = gfsConn.Post;
    });
    await gfs.files.findOne({filename: file}, (err, file) =>{
        resp.image = file._id;
        resp.imageName = file.filename;
        resp.createdBy = req.user.sub;
        resp.description = req.body.desc;
        const post = new Post(resp);
        post.save();
    });

}

async function getPostInfo(req, res){
    var func = require('../_helpers/database');
    let gfs, conn, Post;
    await func.then((gfsConn) => {
        gfs = gfsConn.gfs;
        conn = gfsConn.conn;
        Post = gfsConn.Post;
    });
    Post.findOne({imageName: req.params.id}).populate({path:'createdBy', select:'username'}).populate('image').then(post => {
        res.json(post);
    });
}

async function getAllPostInfo(req, res){
    var func = require('../_helpers/database');
    let gfs, conn, Post;
    await func.then((gfsConn) => {
        gfs = gfsConn.gfs;
        conn = gfsConn.conn;
        Post = gfsConn.Post;
    });
    Post.find().populate({path:'createdBy', select:'username'}).populate('image').then(post => {
        res.json(post);
    });
}

async function showImage(req, res){
    var func = require('../_helpers/database');
    let gfs, conn;
    await func.then((gfsConn) => {
        gfs = gfsConn.gfs;
        conn = gfsConn.conn;
    });
    let resp = {};
    gfs.files.findOne({filename: req.params.id}, (err, file) =>{
        if(!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
    });
}