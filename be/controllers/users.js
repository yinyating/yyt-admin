const userModel = require('../models/users')

const tools = require('../utils/tools')

module.exports = {
    async signup(req, res, next) {
        res.set('content-type', 'application/json;charset=utf-8')
        // 判断用户是否存在
        let {username, password} = req.body
        let result = await userModel.findOne(username)
        if (!result) {
            // 密码加密
            let newPassword = await tools.crypt(password)
            // 保存数据到数据库
            await userModel.save({
                username,
                password: newPassword
            })
            // 给前端返回接口
            res.render('succ',{
                data: JSON.stringify({
                    msg: '用户注册成功~'
                })
            })
        }
        // 提示用户名已经存在
        res.render('fail',{
            data: JSON.stringify({
                msg: '用户已经存在~'
            })
        })
    },
    async signin(req, res, next){
        // 设置请求头
        res.set('content-type','application/json;charset=utf-8')
        // 根据用户名从数据库取出信息进行比对
        let {username, password} = req.body
        let result = await userModel.findOne(username)
        if (result) {
            // let a = await tools.compare(password, result.password)
            // console.log(a)
           if(await tools.compare(password, result.password)){
            req.session.username = username
               res.render('succ', {
                   data: JSON.stringify({
                       msg: '用户登录成功~',
                       username
                   })
               })
            
            }
           else{
                res.render('fail', {
                    data: JSON.stringify({
                        msg: '账号或是密码错误~'
                    })
                })
           }
        }
        else{
            res.render('fail', {
                data: JSON.stringify({
                    msg: '账号或是密码错误~'
                })
            })
       }
    },

    // 判断是否登录过的接口
    isSignin(req, res, next){
        res.set('content-type','application/json;charset=utf-8')
        let username = req.session.username
        
        if(username){
                // if (req.url === '/list' || req.url === '/save' ||  req.url === '/findone' || req.url === '/put') {
                //     next()
                // }
            res.render('succ', {
                data: JSON.stringify({
                    msg: '用户拥有查看权限',
                    username     // username:req.session.username
                })
            })
        }
        else{
            res.render('fail', {
                data: JSON.stringify({
                    msg: '用户拥没有查看权限',
                    username
                })
            })
        }
    },

    isSignout(req, res, next){
        res.set('content-type','application/json;charset=utf-8')
        req.session = null
        res.render('succ', {
            data: JSON.stringify({
                msg: '用户退出成功'
            })
        })
    }
}