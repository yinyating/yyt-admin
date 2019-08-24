var express = require('express');
var router = express.Router();

const Video = require('../controllers/video')
// const Users = require('../controllers/users')
const authMiddleware = require('../middlewares/auth')

// 利用中间件进行拦截
router.get('/list', authMiddleware.auth, Video.list)
// 保存添加按钮提交过来的一条记录
router.post('/save', authMiddleware.auth, Video.save)
// 表格里的修改按钮去找相应的记录
router.post('/findone', authMiddleware.auth, Video.findone)
// 修改表格里的内容后再次进行数据PUT提交
router.put('/put', authMiddleware.auth, Video.put)
// 表格里面的删除按钮删除该条记录
router.delete('/remove',authMiddleware.auth, Video.remove)


module.exports = router