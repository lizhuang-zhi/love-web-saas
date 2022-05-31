var mongoose = require('mongoose')
const { conn } = require('../utils/mongoConn')

// 1. 创建骨架
let DetailsPageSchema = new mongoose.Schema({
    userId: String,
    headTitle: String,
})

// 2. 操作集合 “模型”去操作集合  => 返回集合
let DetailsPage = conn.model('DetailsPage', DetailsPageSchema)

// 其他设置
function getDetailsPageInfo(user_id) {
    return DetailsPage.findOne({
        userId: user_id
    })
}
function createDetailsPageInfo(obj) {
    return DetailsPage.create({
        userId: obj.userId,
        headTitle: obj.headTitle
    })
}
function updateDetailsPageInfo(userId, obj) {
    return DetailsPage.updateOne({
        userId: userId,
    }, {
        headTitle: obj.headTitle
    })
}

module.exports = {
    getDetailsPageInfo,
    updateDetailsPageInfo,
    createDetailsPageInfo
}