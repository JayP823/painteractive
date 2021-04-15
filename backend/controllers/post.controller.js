const postService = require('../services/post.service');

module.exports = {
    createPost,
    getPost,
    showPost
}

function createPost(req, res, next){   
    console.log(req.user);
    postService.createPost(req, req.file.filename);
    res.json({file: req.file});
}

function getPost(req, res){
    postService.getPostInfo(req, res);
}

function showPost(req, res){
    postService.showPost(req, res);
    
}