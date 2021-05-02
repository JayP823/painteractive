module.exports = {
    createPost,
    getPostInfo,
    showImage,
    getAllPostInfo,
    getSomePostInfo,
    getPostsWithTag,
    addTag,
    deleteTag
}

var func = require('../_helpers/database');
let gfs, conn, Post;
func.then((gfsConn) => {
    gfs = gfsConn.gfs;
    conn = gfsConn.conn;
    Post = gfsConn.Post;
});

async function createPost(req, file) {
    await gfs.files.findOne({filename: file}, (err, file) =>{
        resp.image = file._id;
        resp.imageName = file.filename;
        resp.createdBy = req.user.sub;
        resp.description = req.body.desc;
        
        resp.tags = req.body.tags.split(', ');
        const post = new Post(resp);
        post.save();
    });

}

async function getPostInfo(req, res){
    Post.findOne({imageName: req.params.id}).populate({path:'createdBy', select:'username'}).populate('image').then(post => {
        res.json(post);
    });
}

async function getAllPostInfo(req, res){
    Post.find().populate({path:'createdBy', select:'username'}).populate('image').then(post => {
        res.json(post);
    });
}

async function getSomePostInfo(req, res){
    if(!req.query.date){
        req.query.date = new Date();
    }
    Post.find({createdDate: {$lt: req.query.date}}).limit(parseInt(req.query.limit)).populate({path:'createdBy', select:'username'}).populate('image').then(post => {
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
    Post.find({tags: req.params.tag}).populate({path:'createdBy', select:'username'}).populate('image').then(post => {
        res.json(post);
    });
}

async function addTag(req, res){
    Post.findOne({imageName: req.body.imageName}).then(post => {
        let tags = post.tags.concat(req.body.tags.split(', '));
        tags = [...new Set(tags)];
        Post.updateOne({imageName: req.body.imageName}, {tags: tags}).then((post) => {
            res.json(post);
        });
    });
}

async function deleteTag(req, res){
    Post.findOne({imageName: req.body.imageName}).then(post => {
        let tags = post.tags.filter(tag => !(req.body.tags.split(', ').includes(tag)));
        console.log(tags);
        tags = [...new Set(tags)];
        Post.updateOne({imageName: req.body.imageName}, {tags: tags}).then((post) => {
            res.json(post);
        });
    });
}