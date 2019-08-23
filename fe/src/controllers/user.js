// 用户信息模块的逻辑处理

// 加载ejs模板引擎
import userView from '../views/user.art'

let _url = ''
let _type = ''

export default {
    async render(){
        // 获取数据的，使用了ajax,都需要使用async和await
        let result = await this.isSignin()  
        // 加载数据并渲染用户名界面
        let html = userView({
            //  isSignin: false
             isSignin: result.ret,
             username: result.data.username
        })
        $('.user-menu').html(html)
        // 给用户信息界面的按钮绑定事件
        this.bindEventToBtn()
    },
    // 是否已经登录过
    isSignin(){
       return  $.ajax({  // 是个promise
            url:'/api/users/isSignin',
            dataType: 'json',
            success(result){
                // console.log(result.ret,result.username)
                return result
            }
        })
    },
    // 给用户信息的各个按钮绑定事件
    bindEventToBtn(){
       // 根据id和URL设置的一致，来检测是点击了登录还是注册按钮。
       $('#user-menu span').on('click',function(){
            _type = $(this).attr('id')  // 根据各个按钮的id，来判断其接口回跳的后台路径
            _url = _type === 'btn-signin' ? '/api/users/signin' : '/api/users/signup'
            $('input').val('')  // 清除上次输入内容，提高用户体验
       })
       // 
       $('#btn-submit').on('click',()=>{
           let data = $('#user-form').serialize()
           $.ajax({
               url: _url,
               type: 'POST',
            //    dataType:'json',
               data,
               success: this.bindEventSucc.bind(this),
                error: this.bindEventError.bind(this)
           })
       })
       // 登录成功之后的退出按钮
       $('#btn-signout').on('click',()=>{
           $.ajax({
               url: '/api/users/isSignout',
            //    dataType: 'json',
               success: this.bindEventSucc.bind(this),
               error: this.bindEventError.bind(this)
           })
       })
    },
    // 点击按钮之后的ajax的请求成功的信息的集中处理
    bindEventSucc(result){
        if (_type === 'btn-signup') {    // 提示注册成功的信息
            alert(result.data.msg)
        }else if(_type === 'btn-signin'){  // 提示登录成功或失败的信息
            if(result.ret){
                let html = userView({
                    isSignin: true,
                    username: result.data.username
                })
                $('.user-menu').html(html)
                // 因为退出是动态加载的页面，这里提前刷新，不然会退不出去
                location.reload()  
            }else{
                alert(result.data.msg)
            }
        }else{      // 退出成功的话，重新刷新页面
            if(result.ret){
                location.reload()
            }
        }
    },

    bindEventError(){

    }
}