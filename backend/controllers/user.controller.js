const e = require('express');
const userService = require('../services/user.service');

module.exports = {
    register,
    logout,
    authenticate,
    verify,
    update,
    getUserPosts,
    getLikedUserPosts,
    getMedia,
    profile,
    follow,
    getUser
}

function register(req, res, next) {
    //console.log(req.body);
    userService.register(req.body, req.files)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then((user) => {
            if(user){
                res.cookie('token', user.token, {maxAge: 60*60*24*365*10, httpOnly: true})
                res.json(user);
            } else {
                res.status(400).json({message: 'Username or password is incorrect'});
            }
        })
        
        .catch(err => next(err));
}

function logout(req, res, next){
    res.cookie('token', '', {maxAge: 0, httpOnly: true});
    res.status(200).json({ success: true, message: 'User logged out successfully' })
}

function verify(req, res, next){
    userService.verify(req.user.sub)
    .then((resp) => res.json(resp));
}

function update(req, res, next) {
    userService.updateUser(req.body, req.user.sub, req.files, res)
        .then()
        .catch(err => next(err));
}

function getUserPosts(req, res, next){
    userService.getUserPosts(req.user.sub)
    .then((posts) => res.json(posts));
}

function getLikedUserPosts(req, res, next){
    userService.getUserLikedPosts(req.user.sub)
    .then((posts) => res.json(posts));
}

function getMedia(req, res, next){
    userService.getMedia(req.user.sub)
    .then((posts) => res.json(posts));
}

function profile(req, res, next){
    userService.getByUsername(req.body.username)
    .then((posts) => res.json(posts));
}

function follow(req, res, next){
    userService.follow(req, res)
    .then();
}

function getUser(req, res, next){
    userService.getByUsername(req.query.username);
}