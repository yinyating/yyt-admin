import videoView from '../views/video.art'

export default {
    render(req, res, next){
        res.render(videoView(req))
    }
}