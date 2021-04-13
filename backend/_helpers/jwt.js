const expressJwt = require('express-jwt');
const userService = require('../services/user.service')
const config = require('../config.json');

module.exports = jwt;

function jwt(){
    const secret = config.secret;
    return new expressJwt({secret, isRevoked}).unless({
        path: [
            '/',
            '/user/register',
            '/user/authenticate'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getByUsername(payload.sub);

    if(!user){
        return done(null, true);
    }
    done();
}