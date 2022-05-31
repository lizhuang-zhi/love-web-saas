var mongoose = require('mongoose')
const { conn } = require('../utils/mongoConn')

/* 
    1. userId 用户名
    2. fileName 文件名
    3. fileUrl 文件Url
    4. upText 视频上方文字
*/
let SecondPageSchema = new mongoose.Schema({
    userId: String,
    fileName: String,
    fileUrl: String,
    upText: String,
})
let SecondPage = conn.model('SecondPage', SecondPageSchema)

// 第二页
function getSecondPageInfo(user_id) {
    return SecondPage.findOne({
        userId: user_id
    })
}
function createSecondPageInfo(obj) {
    return SecondPage.create({
        userId: obj.userId,
        fileName: obj.fileName,
        fileUrl: obj.fileUrl,
        upText: obj.upText
    })
}
function updateSecondPageInfo(obj) {
    return SecondPage.updateOne({
        userId: obj.userId,
    }, {
        fileName: obj.fileName,
        fileUrl: obj?.fileUrl,
        upText: obj.upText
    })
}

module.exports = {
    createSecondPageInfo,
    getSecondPageInfo,
    updateSecondPageInfo,
}