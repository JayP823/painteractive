const config = require('../config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    getByUsername,
    register,
    authenticate,
    updateUser,
    getUserPosts
}

var func = require('../_helpers/database');
let User, Post;
func.then((gfsConn) => {
    User = gfsConn.User;
    Post = gfsConn.Post;
});

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

async function updateUser(userParam, userID, res){
    let user = await User.findOne({_id: userID});
    if(userParam.newUsername){
        user.username = userParam.newUsername;
    }
    if(userParam.newEmail){
        user.email = userParam.newEmail;
    }
    if(userParam.newFirstName){
        user.firstName = userParam.newFirstName;
    }
    if(userParam.newLastName){
        user.lastName = userParam.newLastName;
    }
    if(userParam.newPassword){
        user.hash = bcrypt.hashSync(userParam.newPassword, 10);
    }
    User.updateOne({_id: userID}, user).then((post) => {
        res.json(post);
    });
}

async function getUserPosts(user){
    return await Post.find({$or: [{createdBy: user}, {reposted: user}]});
}