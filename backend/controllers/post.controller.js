const { post } = require('../routes/post.router');
const postService = require('../services/post.service');
const crypto = require('crypto');

module.exports = {
    createPost,
    deletePost,
    getPost,
    showImage,
    getAllPostInfo,
    getSomePostInfo,
    getPostsWithTag,
    addTag,
    deleteTag,
    like,
    repost,
    gallery,
    postComment,
    getComments
}

function createPost(req, res, next){
    let filename;
    let func = new Promise((resolve, reject) =>{
        if(!req.file){
            crypto.randomBytes(16, (err, buf) => {
                if(err){
                    return reject(err);
                }
                filename = buf.toString('hex') + ".txt";
                resolve(filename)
            });
        } else {
            resolve(req.file.filename);
        }   
    });
    func.then((name) => {
        console.log(req.user);
        postService.createPost(req, name);
        res.json({file: name});
        //res.redirect('/')
    })
}

function deletePost(req, res, next){
    postService.deletePost(req.query.post).then(res.json("Post deleted."));
}

function getPost(req, res){
    postService.getPostInfo(req, res);
}

function showImage(req, res){
    postService.showImage(req, res);
    
}

function getAllPostInfo(req,res){
    postService.getAllPostInfo(req,res);
}

function getSomePostInfo(req,res){
    postService.getSomePostInfo(req,res);
}

function getPostsWithTag(req,res){
    postService.getPostsWithTag(req,res);
}

function addTag(req, res){
    postService.addTag(req, res);
}

function deleteTag(req, res){
    postService.deleteTag(req, res);
}

function like(req, res){
    postService.like(req, res);
}

function repost(req, res){
    console.log(req.user);
    postService.repost(req, res);
}

function gallery(req, res){
    console.log(req.user);
    postService.gallery(req, res);
}

function postComment(req, res){
    postService.postComment(req, res);
}

function getComments(req, res){
    postService.getComments(req, res);
}