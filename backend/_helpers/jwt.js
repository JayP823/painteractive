const expressJwt = require('express-jwt');
const userService = require('../services/user.service')
const config = require('../config.js');

module.exports = jwt;

function jwt(){
    const secret = config.secret;
    return new expressJwt({secret, getToken: req => req.cookies.token, isRevoked, algorithms: ['HS256']}).unless({
        path: /^\/(post\/(?!(new|delete|addtag|deletetag|like|repost|addtogallery|addcomment))(.*|show\/.*))|\/(user\/(register|authenticate|posts\/.*|profile|search))|\/$/
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getByUsername(payload.sub);

    if(!user){
        return done(null, true);
    }
    done();
}