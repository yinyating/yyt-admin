import SMERouter from 'sme-router'
const router = new SMERouter('router-view','hash')


// router.route('', (req, res, next)=>{
//     res.render('hello hahaha')
// })
// 把上述方法抽离出去，细化模块
import Home from '../controllers/home'
// 添加新的路由
import Video from '../controllers/video'  

router.route('/',Home.render)
// router.route('./video',Video.render)  //带点就不行，路径一定得写对
router.route('/video',Video.render)

// 提高用户体验，重定向到根目录之下
router.redirect('/')

export default router