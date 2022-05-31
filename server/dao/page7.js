var mongoose = require('mongoose')
const {
    conn
} = require('../utils/mongoConn')

let SeventhPageSchema = new mongoose.Schema({
    userId: String,
    timeStamp: String
})
let SeventhPage = conn.model('SeventhPage', SeventhPageSchema)

function getSeventhPageInfo(user_id) {
    return SeventhPage.findOne({
        userId: user_id
    })
}
function createSeventhPageInfo(obj) {
    return SeventhPage.create({
        userId: obj.userId,
        timeStamp: obj.timeStamp
    })
}
function updateSeventhPageInfo(user_id, timeStamp) {
    return SeventhPage.updateOne({
        userId: user_id,
    }, {
        timeStamp: timeStamp
    })
}

module.exports = {
    getSeventhPageInfo,
    createSeventhPageInfo,
    updateSeventhPageInfo,
}