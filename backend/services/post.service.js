module.exports = {
    createPost,
    deletePost,
    getPostInfo,
    showImage,
    getAllPostInfo,
    getSomePostInfo,
    getPostsWithTag,
    addTag,
    deleteTag,
    like,
    repost,
    gallery,
    postComment,
    getComments
}

const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
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
let gfs, conn, Post;
func.then((gfsConn) => {
    gfs = gfsConn.gfs;
    conn = gfsConn.conn;
    Post = gfsConn.Post;
    User = gfsConn.User;
});

async function createPost(req, name) {
    let resp = {};
    await gfs.files.findOne({filename: name}, (err, file) =>{
        if(file){
            resp.image = file._id;
        }
        resp.postID = name;
        resp.createdBy = req.user.sub;
        resp.description = req.body.desc;
        
        resp.tags = req.body.tags.split(', ');
        const post = new Post(resp);
        post.save();
    });
}

async function deletePost(name) {
    console.log(name);
    await gfs.files.remove({filename: name});
    return await Post.deleteOne({postID: name});
}

async function getPostInfo(req, res){
    Post.findOne({postID: req.params.id}).populate({path:'createdBy'}).populate({path: 'comments.user'}).populate('image').then(post => {
        res.json(post);
    });
}

async function getAllPostInfo(req, res){
    Post.find().populate({path:'createdBy'}).populate({path: 'comments.user'}).populate('image').then(post => {
        res.json(post);
    });
}

async function getSomePostInfo(req, res){
    if(!req.query.date){
        req.query.date = new Date();
    }
    let skipNum = req.query.page * 12;
    Post.find({}).sort({createdDate: -1}).skip(skipNum).limit(12).populate({path:'createdBy'}).populate({path: 'comments.user'}).populate('image').then(post => {
        res.json(post);
    });
}

async function showImage(req, res){
    gfs.files.findOne({filename: req.params.id}, (err, file) =>{
        if(!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
    });
}

async function getPostsWithTag(req, res){
    let skipNum = req.query.page * 12;
    let count = await Post.find({}).count();
    Post.find({tags: req.params.tag}).sort({createdDate: -1}).skip(skipNum).limit(12).populate({path:'createdBy'}).populate({path: 'comments.user'}).populate('image').then(post => {
        res.json({posts: post, count: count});
    });
}

async function addTag(req, res){
    Post.findOne({postID: req.body.postID}).then(post => {
        try {
            if(post.tags.length >= 3){
                throw "Max tags reached."
            }
            let tags = post.tags.concat(req.body.tags.split(', ')).filter(distinct);
            console.log(tags);
            tags = [...new Set(tags)];
            Post.updateOne({postID: req.body.postID}, {tags: tags}).then((post) => {
                res.json(post);
            });
        } catch (e){
            res.json(e)
        }
    });
}

async function deleteTag(req, res){
    Post.findOne({postID: req.body.postID}).then(post => {
        let tags = post.tags.filter(tag => !(req.body.tags.split(', ').includes(tag)));
        console.log(tags);
        tags = [...new Set(tags)];
        Post.updateOne({postID: req.body.postID}, {tags: tags}).then((post) => {
            res.json(post);
        });
    });
}

async function like(req, res){
    Post.findOne({postID: req.body.postID}).then(post => {
        if(post.liked.includes(req.user.sub)){
            post.liked.remove(req.user.sub);
            Post.updateOne({postID: req.body.postID}, {liked: post.liked}).then((post) => {
                res.json(post);
            });
        } else {
            let liked = post.liked.concat(req.user.sub).filter(distinct);
            liked = [...new Set(liked)];
            Post.updateOne({postID: req.body.postID}, {liked: liked}).then((post) => {
                res.json(post);
            });
        }
    });
}

async function repost(req, res){
    Post.findOne({postID: req.body.postID}).then(post => {
        if(post.reposted.includes(req.user.sub)){
            post.reposted.remove(req.user.sub);
            Post.updateOne({postID: req.body.postID}, {reposted: post.reposted}).then((post) => {
                res.json(post);
            });
        } else {
            let reposted = post.reposted.concat(req.user.sub).filter(distinct);
            reposted = [...new Set(reposted)];
            Post.updateOne({postID: req.body.postID}, {reposted: reposted}).then((post) => {
                res.json(post);
            });
        }
    });
}

async function gallery(req, res){
    User.findOne({_id: req.user.sub}).then(user => {
        if(user.gallery.includes(req.body.postID)){
            user.gallery.remove(req.body.postID);
            User.updateOne({_id: req.user.sub}, {gallery: user.gallery}).then((post) => {
                res.json("removed from gallery")
            });
        } else {
            user.gallery.push(req.body.postID);
            User.updateOne({_id: req.user.sub}, {gallery: user.gallery}).then((post) => {
                res.json("added to gallery")
            });
            
        }
    })
}

async function postComment(req, res){
    Post.findOne({postID: req.body.postID}).then(post => {
        let newComment = {user: req.user.sub, comment: req.body.comment}
        post.comments.push(newComment);
        Post.updateOne({postID: req.body.postID}, {comments: post.comments}).then(() => {
            res.json("Comment added to post!");
        });
    })
}

async function getComments(req, res){
    Post.findOne({postID: req.query.postID}).populate({path: 'comments.user'}).then(post => {
        console.log(post)
        res.json(post.comments);
    })
}
