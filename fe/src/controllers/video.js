import videoView from '../views/video.art'

export default {
    render(req, res, next){
        // 
        $.ajax({
            url: '/api/video/list',
            success(result){
                if (result.ret) {    // ajax请求成功，直接渲染请求返回数据
                    res.render(videoView({  
                        list: result.data
                    })) 
                } else {        // 当没登录过，被拦截下来时，就直接显示欢迎页
                    res.go('/')
                }
            }
        })
    }
}