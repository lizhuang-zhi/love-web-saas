var mongoose = require('mongoose')
const { conn } = require('../utils/mongoConn')

let FirstPageSchema = new mongoose.Schema({
    userId: String,
    themeContent: String,
    description: String,
    btnContent: String,
})
let FirstPage = conn.model('FirstPage', FirstPageSchema)
// 第一页
function createFirstPageInfo(obj) {
    return FirstPage.create({
        userId: obj.userId,
        themeContent: obj.themeContent,
        description: obj.description,
        btnContent: obj.btnContent,
    })
}
function getFirstPageInfo(user_id) {
    return FirstPage.findOne({
        userId: user_id
    })
}
function updateFirstPageInfo(user_id, info) {
    return FirstPage.updateOne({
        userId: user_id
    }, {
        themeContent: info.themeContent,
        description: info.description,
        btnContent: info.btnContent,
    })
}

module.exports = {
    createFirstPageInfo,
    getFirstPageInfo,
    updateFirstPageInfo,
}