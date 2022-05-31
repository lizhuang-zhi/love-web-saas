var mongoose = require('mongoose')
const { conn } = require('../utils/mongoConn')

let FourthPageSchema = new mongoose.Schema({
    userId: String,
    RotationMap: Array
})

let FourthPage = conn.model('FourthPage', FourthPageSchema)

// 第四页
/* 
    leftTopDesc: String,
    leftBottomDesc: String,
    leftTitle: String,
    fileObj: [{
        id: '',
        name: '',
        status: '',
        url: ''
    }],
    rightTitle: String,
    rightDesc: String
*/
function getFourthPageInfo(user_id) {
    return FourthPage.findOne({
        userId: user_id
    })
}
function createFourthPageInfo(userId, RotationMap) {
    return FourthPage.create({
        userId: userId,
        RotationMap: RotationMap
    })
}
function updateFourthPageInfo(userId, RotationMap) {
    return FourthPage.updateOne({
        userId: userId,
    }, {
        RotationMap: RotationMap
    })
}

module.exports = {
    getFourthPageInfo,
    createFourthPageInfo,
    updateFourthPageInfo,
}