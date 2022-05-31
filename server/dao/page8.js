var mongoose = require('mongoose')
const {
    conn
} = require('../utils/mongoConn')

let EighthPageSchema = new mongoose.Schema({
    userId: String,
    fileArr: Array
})
let EighthPage = conn.model('EighthPage', EighthPageSchema)

// 第八页
function getEighthPageInfo(user_id) {
    return EighthPage.findOne({
        userId: user_id
    })
}
function createEighthPageInfo(userId, fileArr) {
    return EighthPage.create({
        userId: userId,
        fileArr: fileArr
    })
}
function updateEighthPageInfo(userId, fileArr) {
    return EighthPage.updateOne({
        userId: userId,
    }, {
        fileArr: fileArr
    })
}

module.exports = {
    getEighthPageInfo,
    updateEighthPageInfo,
    createEighthPageInfo,
}