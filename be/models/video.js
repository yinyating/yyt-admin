const mongoose = require('../utils/db')

const Videos = mongoose.model('videos',{
    videoName: String,
    keyWord: String,
    publisher: String,
    hits: String,
    // 存储创建时间
    createTime: String
})

module.exports = {
    // 查找出所有的数据记录
    find(){
        return Videos.find({}).sort({_id: -1})
    },
    // 保存提交的一条数据记录
    save(data){
        let model = new Videos(data)
        return model.save()
    },
    // 查找出某一条记录 根据id
    findone(id){
        // return Videos.findById(id)
        return Videos.findById({_id:id})
    },
    // 修改之后，更新修改的那条数据记录
    put(data){
        return Videos.updateOne({_id: data.id}, data)
    },
    // 删除某一条记录
    remove(id){
        return Videos.deleteOne({_id:id})
    }
}