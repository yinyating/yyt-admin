// home页，欢迎页，也是写的推荐的路由导航到的页面

// controllers里面的js代码可以载入views里面的模板
import homeView from '../views/home.art'

// 路由里面渲染主页的回调函数的定义部分的抽出
export default {
   render(req, res, next){
      // console.log(req)
    //    res.render('hello home')
    //   res.render(homeView(), {})
     res.render(homeView(req))
   }
}
