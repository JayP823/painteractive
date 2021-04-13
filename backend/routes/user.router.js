var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/register', userController.register);
router.post('/authenticate', userController.authenticate);

module.exports = router;