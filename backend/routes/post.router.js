const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const config = require('../config.js');

const storage = new GridFsStorage({
    url:config.connectionString,
    file: (req, file) => {
        return new Promise((resolve, reject) =>{
            crypto.randomBytes(16, (err, buf) => {
                if(err){
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({storage})

router.post('/new', upload.single('file'), postController.createPost);
router.delete('/delete', postController.deletePost);
router.get('/all', postController.getAllPostInfo)
router.get('/feed', postController.getSomePostInfo)
router.get('/:id', postController.getPost);
router.get('/show/:id', postController.showImage);
router.get('/tag/:tag', postController.getPostsWithTag);
router.post('/addtag', postController.addTag);
router.post('/deletetag', postController.deleteTag);


module.exports = router;