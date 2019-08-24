import SMERouter from 'sme-router'
const router = new SMERouter('router-view','hash')

// router.route('', (req, res, next)=>{
//     res.render('hello hahaha')
// })

// 把上述方法抽离出去，细化模块
import Home from '../controllers/home'
// 添加新的路由
import Video from '../controllers/video'  
// 头部的用户的路由
import User from '../controllers/user'

// sme-router中间件
router.use((req, res, next) =>{
    $(`.sidebar-menu li.nav a[href="/#${req.url}"]`)
    .parent()
    .addClass('active')
    .siblings()
    .removeClass('active')
})

router.route('/',Home.render)
// router.route('./video',Video.render)  //带点就不行，路径一定得写对
router.route('/video',Video.render)  // router.route('/video-list',Video.render)
router.route('/video-add',Video.add)
router.route('/video-edit',Video.edit)

// 提高用户体验，重定向到根目录之下
// 为方便调试，重定向到video 之下
router.redirect('/video')

// 把首次渲染页面渲染用户信息放在这里，没有把它单独出去，没有更合适的位置
User.render()   

export default router