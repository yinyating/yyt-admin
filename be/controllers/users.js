const userModel = require('../models/users')
const tools = require('../utils/tools')

module.exports = {
    // 关于设置请求头，这里都需要设置；因为前端需要使用 json格式的 ret的true和false给用户返回信息     同理，该文件夹下的video.js里的各个方法也是需要设置请求头的
    // 注册
    async signup(req, res, next) {
        res.set('content-type', 'application/json;charset=utf-8')  
        let {username, password} = req.body   // 判断用户是否存在
        let result = await userModel.findOne(username)
        if (!result) {
            let newPassword = await tools.crypt(password)     // 密码加密
            let result = await userModel.save({      // 保存数据到数据库
                username,
                password: newPassword
            })
            // 给前端返回接口及提示信息  // 这里要判断是否写入数据库成功或是失败
            if (result) {
                res.render('succ',{
                    data: JSON.stringify({   
                        msg: '用户注册成功~'   // ！！密码为空也提示注册成功！！
                    })
                })
            } else {
                res.render('fail',{
                    data: JSON.stringify({
                        msg: '用户注册失败~'
                    })
                })
            }
           
        }
        res.render('fail',{  // 提示用户名已经存在
            data: JSON.stringify({
                msg: '用户已经存在~'
            })
        })
    },
    // 登录
    async signin(req, res, next){
       res.set('content-type','application/json;charset=utf-8') 
        // 根据用户名从数据库取出信息进行比对
        let {username, password} = req.body
        let result = await userModel.findOne(username)
        if (result) {
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
                    msg: '用户登录失败~'
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
    // 退出登录
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