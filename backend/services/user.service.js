const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const User = db.User;

module.exports = {
    getByUsername,
    register,
    authenticate
}

async function getByUsername(username){
    return await User.find({username: username});
}

async function register(userParam){
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
    const user = await User.findOne({username});
    if(user && bcrypt.compareSync(password, user.hash)) {
        const {hash, ...userWithoutHash} = user.toObject();
        const token = jwt.sign({sub: user.id}, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}