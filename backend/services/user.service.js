const config = require('../config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    getByUsername,
    register,
    authenticate,
    verify,
    updateUser,
    getUserPosts,
    getUserLikedPosts,
    getMedia,
    follow
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

var func = require('../_helpers/database');
let User, Post;
func.then((gfsConn) => {
    gfs = gfsConn.gfs;
    User = gfsConn.User;
    Post = gfsConn.Post;
});

async function getByUsername(username){
    return await User.find({username: username});
}

async function register(userParam, files){
    if(await User.findOne({username: userParam.username})){
        throw 'Username ' + userParam.username + ' is already taken';
    }
    else if (await User.findOne({email: userParam.email})){
        throw 'Email ' + userParam.email + ' is already taken';
    }
    let file = {};
    if(!files){
        file.avatar = [];
        file.header = [];
        file.avatar.push({filename: "fe68485d476e7df54110e4eb71530aa6.jpg"});
        file.header.push({filename: "7a93a712e7048d843cb9818bda938b88.png"});
    } else {
        file = files;
    }
    userParam.profilePic = file.avatar[0].filename;
    userParam.headerPic = file.header[0].filename;
    const user = new User(userParam);
    if(userParam.password){
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    user.save();
    


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

async function verify(user){
    let newUser = await User.findOne({_id: user});
    const {hash, ...userWithoutHash} = newUser.toObject();
    return {...userWithoutHash}
}


async function updateUser(userParam, userID, files, res){
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
    if(userParam.newBio){
        user.bio = userParam.newBio;
    }
    if(files){
        if(files.avatar){
            user.profilePic = files.avatar[0].filename;
        }
        if(files.header){
            user.headerPic = files.header[0].filename;
        }
    }
    User.updateOne({_id: userID}, user).then((post) => {
        res.json(post);
    });
}

async function getUserPosts(user){
    let skipNum = req.query.page * 12;
    return await Post.find({$or: [{createdBy: user}, {reposted: user}]}).sort({createdDate: -1}).skip(skipNum).limit(12);
}

async function getUserLikedPosts(user){
    let skipNum = req.query.page * 12;
    return await Post.find({liked: user}).sort({createdDate: -1}).skip(skipNum).limit(12);
}

async function getMedia(user){
    let skipNum = req.query.page * 12;
    return await Post.find({$and: [{$or: [{createdBy: user}, {reposted: user}]}, {image: {$exists: true}}]}).sort({createdDate: -1}).skip(skipNum).limit(12);
}

async function getMedia(user){
    let skipNum = req.query.page * 12;
    return await User.find().sort({createdDate: -1}).skip(skipNum).limit(12);
}

async function follow(req, res){
    let followingUser = await getByUsername(req.body.username);
    User.findOne({_id: req.user.sub}).then(user => {
        if(user.following.includes(followingUser[0]._id)){
            user.following.remove(followingUser[0]._id);
            followingUser[0].followers.remove(req.user.sub);
            User.updateOne({_id: req.user.sub}, {following: user.following}).then(() => {
                User.updateOne({_id: followingUser[0]._id}, {followers: followingUser[0].followers}).then(() => {
                    res.json(req.body.username + " unfollowed!")
                })
            });
        } else {
            user.following.push(followingUser[0]._id);
            followingUser[0].followers.push(req.user.sub);
            User.updateOne({_id: req.user.sub}, {following: user.following}).then(() => {
                User.updateOne({_id: followingUser[0]._id}, {followers: followingUser[0].followers}).then(() => {
                    res.json(req.body.username + " followed!");
                });
            });
        }
    })
}