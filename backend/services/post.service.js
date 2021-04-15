module.exports = {
    createPost,
    getPostInfo,
    showPost
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
    let resp = {};
    gfs.files.findOne({filename: req.params.id}, (err, file) =>{
        if(!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        resp.file = file;
        Post.findOne({image: file._id}).then(post => {
            resp.post = post;
            return res.json(resp);
        });

    });
}

async function showPost(req, res){
    var func = require('../_helpers/database');
    let gfs, conn;
    await func.then((gfsConn) => {
        gfs = gfsConn.gfs;
        conn = gfsConn.conn;
    });

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