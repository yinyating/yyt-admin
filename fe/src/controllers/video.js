import videoView from '../views/video-list.art'
import videoAdd from '../views/video-add.art'
import videoEdit from '../views/video-edit.art'
import _ from 'lodash'

const COUNT = 3

function remove(id, res){
    $.ajax({
        url: '/api/video/remove',
        type: 'DELETE',
        data: {  
            id   // id: id
        },
        success(result){
            if (result.ret) {
                res.go('/video?_=' + new Date().getTime())  // 加个query,改变路由，实现无刷新页面呈现出删除数据之后的列表
            }
        }
    })
}

function loadData(pageNo, res){
    let start = pageNo * COUNT
    $.ajax({
        url: '/api/video/list',
        data: {
            start,
            count: COUNT
        },
        success(result){      // console.log(result)
            if (result.ret) {    // ajax请求成功，直接渲染请求返回数据
                res.render(videoView(
                    // result.data   
                    {  
                        ...result.data,
                        pageNo,
                        pageCount: _.range(Math.ceil(result.data.total / COUNT))
                    }
                )) 
            } else {        // 当没登录过，被拦截下来时，就直接显示欢迎页
                res.go('/')
            }
        }
    })
}
export default {
    render(req, res, next){
        loadData(0, res)
        
        // 把ajax分离出去之后，添加、修改、删除按钮，都会失效。异步的，不能直接绑定。解决办法：做代理

        // 成功渲染表单之后，点击添加按钮，做ASP路由跳转
        $('#router-view').on('click','#addbtn', () =>{
            res.go('/video-add')
        } )
        // 给表单之中的修改按钮绑定事件
        $('#router-view').on('click', '.btn-update', function() {
            res.go('/video-edit', {
                id: $(this).attr('data-id')  // 传入id
            })
        })
        // 给表单之中的删除按钮绑定事件
        $('#router-view').on('click', '.btn-delete', function(){
            remove($(this).attr('data-id'), res)
        })
             
        // 页码高亮
        $('#router-view').on('click', '#page li[data-index]', function(){
            console.log($(this).attr('data-index'))
            loadData($(this).attr('data-index'), res)
        })

    },
    add(req, res, next){
        res.render(videoAdd({}))
        // 点击返回按钮 回退到video页面
        $('#posback').on('click', ()=>{
            res.back()
        })
        // 点击提交按钮 ajax请求提交数据
        $('#possubmit').on('click', () => {
            let data = $('#possave').serialize()    //表单数据序列化
            $.ajax({
                url: '/api/video/save',
                type: 'POST',
                data,
                success(result){     // console.log(result)
                    if (result.ret) {
                        res.back()
                    } else {
                        alert(result.data.msg)
                    }
                }
            })
        })
    },
    edit(req, res, next){   // console.log(req)
        // 先做ajax请求，在渲染修改的表单页面
        $.ajax({
            url: '/api/video/findone',
            type: 'POST',
            data: {
                id: req.body.id,
            }, 
            success(result){
                res.render(videoEdit(result.data))
                // render之后再绑定
                $('#posback').on('click', () => {
                    res.back()
                })
                // 修改之后的提交按钮
                $('#possubmit').on('click', () => {
                   let data = $('#posedit').serialize()   //console.log(data)
                   $.ajax({
                       url: '/api/video/put',
                       type: 'PUT',
                       data: data + '&id=' + req.body.id,  // data除了可以传数据，可以传字符串
                       success(result){
                           if(result.ret){
                               res.back()
                           }else{
                               alert("result.data.msg")
                           }
                       }
                   })
                })
            }
        })
    }
}