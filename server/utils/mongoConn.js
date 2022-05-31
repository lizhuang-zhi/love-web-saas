var mongoose = require('mongoose')

// 创建node链接mongo
const conn = mongoose.createConnection("mongodb://127.0.0.1:27017/loveWeb")

module.exports = {
    conn
}