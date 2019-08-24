const videoModel = require('../models/video')
const moment = require('moment')
module.exports = {
    async list(req, res, next){
        res.set('content-type','application/json;charset=utf-8')
        let result = await videoModel.find()
        // console.log(result)
        if (result) {
            res.render('succ', {
                data: JSON.stringify(result)
            })
        }
    },

    // 存储数据，先做数据库的链接，在model里面 
    // 注意是个异步操作
    async save(req, res, next){
        res.set('content-type','application/json;charset=utf-8')
        // 往保存的数据记录里面加一条创建时间字段 
        // 做复杂对象合并的思路
        let result = await videoModel.save({
            ...req.body,
            // 格式化日期  moment
            createTime: moment().format('YYYY-MM-DD h:mm:ss')
        })
       if (result) {
           res.render('succ',{
               data: JSON.stringify({
                   msg: '数据添加成功。'
               })
           })
       } else {
           res.render('fail', {
               data: JSON.stringify({
                   msg: '数据加载失败'
               })
           })
       }
    },

    // 查找出某一条数据
    async findone(req, res, next){
        res.set('content-type','application/json;charset=utf-8')
        let result = await videoModel.findone(req.body.id)
        // 拿到的数据有可能为空，加个逻辑判断
        if (result) {
            res.render('succ', {
                data: JSON.stringify(result)
            })
        }
    },

    // 修改了某一条数据
    async put(req, res, next){
        res.set('content-type','application/json;charset=utf-8')
        let result = await videoModel.put({
            ...req.body,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')  //修改之后创建时间会更新，根据需求按需求是否再按时间倒序排序
        })
        res.render('succ', {
            data: JSON.stringify({
              msg: '数据修改成功.'  
            })
        })
    },

    // 删除某一条数据
    async remove(req, res, next){
        let result = await videoModel.remove(req.body.id)
        res.render('succ', {
            data: JSON.stringify({
                msg: '数据删除成功'
            })
        })
    }
}