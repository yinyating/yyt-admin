var express = require('express');
var router = express.Router();

const Video = require('../controllers/video')
const Users = require('../controllers/users')

// 利用中间件进行拦截
router.get('/list', Users.isSignin, Video.list)

module.exports = router