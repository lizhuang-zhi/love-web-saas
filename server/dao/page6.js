var mongoose = require('mongoose')
const {
    conn
} = require('../utils/mongoConn')

let SixthPageSchema = new mongoose.Schema({
    userId: String,
    title: String,
    desc11: String,
    desc12: String,
    desc2: String,
    desc3: String,
    desc4: String,
    desc5: String,
    desc6: String,
    desc7: String,
})
let SixthPage = conn.model('SixthPage', SixthPageSchema)

function getSixthPageInfo(user_id) {
    return SixthPage.findOne({
        userId: user_id
    })
}
function createSixthPageInfo(obj) {
    return SixthPage.create({
        userId: obj.userId,
        title: obj.title,
        desc11: obj.desc11,
        desc12: obj.desc12,
        desc2: obj.desc2,
        desc3: obj.desc3,
        desc4: obj.desc4,
        desc5: obj.desc5,
        desc6: obj.desc6,
        desc7: obj.desc7,
    })
}
function updateSixthPageInfo(obj) {
    return SixthPage.updateOne({
        userId: obj.userId,
    }, {
        title: obj.title,
        desc11: obj.desc11,
        desc12: obj.desc12,
        desc2: obj.desc2,
        desc3: obj.desc3,
        desc4: obj.desc4,
        desc5: obj.desc5,
        desc6: obj.desc6,
        desc7: obj.desc7,
    })
}

module.exports = {
    getSixthPageInfo,
    createSixthPageInfo,
    updateSixthPageInfo,
}