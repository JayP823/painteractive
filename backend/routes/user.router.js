var express = require('express');
var router = express.Router();
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const config = require('../config.js');

const userController = require('../controllers/user.controller');

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

router.post('/register', upload.fields([{name: 'avatar', maxCount: 1}, {name: 'header', maxCount: 1}]), userController.register);
router.post('/logout', userController.logout)
router.post('/authenticate', upload.none(), userController.authenticate);
router.post('/verify', userController.verify)
router.post('/update', upload.fields([{name: 'avatar', maxCount: 1}, {name: 'header', maxCount: 1}]), userController.update);
router.get('/posts', userController.getUserPosts);
router.get('/posts/liked', userController.getLikedUserPosts);
router.get('/posts/media', userController.getMedia);
router.get('/profile/', userController.profile);
router.post('/follow', userController.follow);
router.get('/search', userController.getUser)

module.exports = router;