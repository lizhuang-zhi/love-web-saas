var mongoose = require('mongoose')
// 创建node链接mongo
const conn = mongoose.createConnection("mongodb://127.0.0.1:27017/loveWeb")

let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    gender: Number,
    createAt: {
        type: Date,
        default: Date.now
    },
})
let EmailCodeSchema = new mongoose.Schema({
    email: String,
    code: String,
    expire: Number,
})
let User = conn.model('User', UserSchema)
let EmailCode = conn.model('EmailCode', EmailCodeSchema)

// 用户
function userLogin(email, password) {
    return User.findOne({
        email: email,
        password: password
    })
}
function userRegister(account) {
    return User.create({
        username: account.username,
        password: account.password,
        email: account.email,
        gender: account.gender
    })
}
function userCheckExist(email) {
    return User.findOne({
        email: email
    })
}
function updateUserInfo(account) {
    return User.updateOne({
        _id: account.userId
    }, {
        username: account.username,
        password: account.password
    })
}
function checkUser(user_id) {
    return User.findById({
        _id: user_id
    })
}
// 验证码
function createEmailCode(email, code, expire) {
    return EmailCode.create({
        email: email,
        code: code,
        expire: expire
    })
}

function updateEmailCode(email, code, expire) {
    return EmailCode.updateOne({
        email: email,
    }, {
        code: code,
        expire: expire
    })
}

function checkEmailExist(email) {
    return EmailCode.findOne({
        email: email,
    })
}

// 验证验证码是否有效
function checkCodeEffective(email, code) {
    return EmailCode.findOne({
        email: email,
        code: code
    })
}

module.exports = {
    userLogin,
    userRegister,
    userCheckExist,
    updateUserInfo,
    checkUser,
    createEmailCode,
    updateEmailCode,
    checkEmailExist,
    checkCodeEffective,
}