var mongoose = require('mongoose')
const {
    conn
} = require('../utils/mongoConn')

let FifthPageSchema = new mongoose.Schema({
    userId: String,
    timeStamp: String,
})
let FifthPage = conn.model('FifthPage', FifthPageSchema)

// 第五页
function getFifthPageInfo(user_id) {
    return FifthPage.findOne({
        userId: user_id
    })
}
function createFifthPageInfo(obj) {
    return FifthPage.create({
        userId: obj.userId,
        timeStamp: obj.timeStamp
    })
}
function updateFifthPageInfo(user_id, timeStamp) {
    return FifthPage.updateOne({
        userId: user_id,
    }, {
        timeStamp: timeStamp
    })
}

module.exports = {
    getFifthPageInfo,
    createFifthPageInfo,
    updateFifthPageInfo,
}