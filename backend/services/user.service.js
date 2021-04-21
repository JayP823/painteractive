const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
//const User = db.User;
//const User = require('../models/user.model');

module.exports = {
    getByUsername,
    register,
    authenticate
}

async function getByUsername(username){
    var func = require('../_helpers/database');
    let User;
    await func.then((gfsConn) => {
        User = gfsConn.User;
    });
    
    return await User.find({username: username});
}

async function register(userParam){
    var func = require('../_helpers/database');
    let User;
    await func.then((gfsConn) => {
        User = gfsConn.User;
    });

    if(await User.findOne({username: userParam.username})){
        throw 'Username ' + userParam.username + ' is already taken';
    }
    else if (await User.findOne({email: userParam.email})){
        throw 'Email ' + userParam.email + ' is already taken';
    }

    const user = new User(userParam);

    if(userParam.password){
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    await user.save();
}

async function authenticate({username, password}){
    var func = require('../_helpers/database');
    let User;
    await func.then((gfsConn) => {
        User = gfsConn.User;
    });

    let userObj = await User.findOne({username: username});
    if(!userObj){
        userObj = await User.findOne({email: username});
    }
    if(userObj && bcrypt.compareSync(password, userObj.hash)) {
        const {hash, ...userWithoutHash} = userObj.toObject();
        const token = jwt.sign({sub: userObj.id}, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}