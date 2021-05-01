const userService = require('../services/user.service');

module.exports = {
    register,
    authenticate,
    update
}

function register(req, res, next) {
    console.log(req.body);
    userService.register(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({message: 'Username or password is incorrect'}))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.updateUser(req.body, req.user.sub, res)
        .then()
        .catch(err => next(err));
}