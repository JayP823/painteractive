const e = require('express');
const userService = require('../services/user.service');

module.exports = {
    register,
    authenticate,
    update,
    getUserPosts
}

function register(req, res, next) {
    console.log(req.body);
    userService.register(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then((user) => {
            if(user){
                res.cookie('token', user.token, {httpOnly: true})
                res.json(user);
            } else {
                res.status(400).json({message: 'Username or password is incorrect'});
            }
        })
        
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.updateUser(req.body, req.user.sub, res)
        .then()
        .catch(err => next(err));
}

function getUserPosts(req, res, next){
    userService.getUserPosts(req.user.sub)
    .then((posts) => res.json(posts));
}