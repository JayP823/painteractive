const { post } = require('../routes/post.router');
const postService = require('../services/post.service');

module.exports = {
    createPost,
    getPost,
    showImage,
    getAllPostInfo
}

function createPost(req, res, next){   
    postService.createPost(req, req.file.filename);
    //res.json({file: req.file});
    res.redirect('/')
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