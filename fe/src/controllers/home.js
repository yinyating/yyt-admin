// controllers里面的js代码可以载入views里面的模板
import homeView from '../views/home.art'

export default {
   render(req, res, next){
    //    res.render('hello home')
    res.render(homeView(req))
   }
}
