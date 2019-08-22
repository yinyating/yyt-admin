import userView from '../views/user.art'

let _url = ''
let _type = ''

export default {
    render(){
        // res.render(userView(req),{})
        let html = userView({
            isSignin: false
        })
        $('.user-menu').html(html)
        this.bindEventToBtn()
    },
    bindEventToBtn(){
    //    $('.hidden-xs').on('click',function(){
       $('#user-menu span').on('click',function(){

            _type = $(this).attr('id')
            _url = _type === 'btn-signin' ? '/api/users/signin' : '/api/users/signup'
            // 清除上次输入内容，提高用户体验
            $('input').val('')
       })
       $('#btn-submit').on('click',()=>{
           let data = $('#user-form').serialize()
           $.ajax({
               url: _url,
               type: 'POST',
            //    dataType:'json',
               data,
               success(result){
                  if (_type === 'btn-signin') {
                      if(result.ret){
                          let html = userView({
                              isSignin: true,
                              username: result.data.username
                          })
                          $('.user-menu').html(html)
                      }else{
                          alert(result.data.msg)
                      }
                  }else{
                      if (result.ret) {
                          alert('注册成功，可以登录了')
                      }else{
                          alert(result.data.msg)
                      }
                  }
               }
           })
       })
    }
}