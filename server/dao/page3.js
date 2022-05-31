var mongoose = require('mongoose')
const { conn } = require('../utils/mongoConn')

let ThirdPageSchema = new mongoose.Schema({
    userId: String,
    fileName: String,
    fileUrl: String,
    upText: String,
})
let ThirdPage = conn.model('ThirdPage', ThirdPageSchema)
// 第三页
function getThirdPageInfo(user_id) {
    return ThirdPage.findOne({
        userId: user_id
    })
}
function createThirdPageInfo(obj) {
    return ThirdPage.create({
        userId: obj.userId,
        fileName: obj.fileName,
        fileUrl: obj.fileUrl,
        upText: obj.upText
    })
}
function updateThirdPageInfo(obj) {
    return ThirdPage.updateOne({
        userId: obj.userId,
    }, {
        fileName: obj.fileName,
        fileUrl: obj?.fileUrl,
        upText: obj.upText
    })
}

module.exports = {
    getThirdPageInfo,
    createThirdPageInfo,
    updateThirdPageInfo,
}