
module.exports = {
    // 中间件的拦截提取出来
    auth(req, res, next){
        res.set('content-type', 'application/json;chatset=utf-8')
        let username = req.session.username
        if(username){
            next()
        }
        else{
            res.render('fail', {
                data: JSON.stringify({
                    msg: '用户拥没有查看权限'
                })
            })
        }
    }

}