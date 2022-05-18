var mongoose = require('mongoose')

// 创建node链接mongo
const conn = mongoose.createConnection("mongodb://127.0.0.1:27017/loveWeb")

// 1. 创建骨架
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
let FirstPageSchema = new mongoose.Schema({
    userId: String,
    themeContent: String,
    description: String,
    btnContent: String,
})
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
let ThirdPageSchema = new mongoose.Schema({
    userId: String,
    fileName: String,
    fileUrl: String,
    upText: String,
})
let FourthPageSchema = new mongoose.Schema({
    userId: String,
    RotationMap: Array
})
let FifthPageSchema = new mongoose.Schema({
    userId: String,
    timeStamp: String,
})
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
let SeventhPageSchema = new mongoose.Schema({
    userId: String,
    timeStamp: String
})
let EighthPageSchema = new mongoose.Schema({
    userId: String,
    fileArr: Array
})

// 2. 操作集合 “模型”去操作集合  => 返回集合
let User = conn.model('User', UserSchema)
let EmailCode = conn.model('EmailCode', EmailCodeSchema)
// 第一页设置
let FirstPage = conn.model('FirstPage', FirstPageSchema)
// 第二页设置
let SecondPage = conn.model('SecondPage', SecondPageSchema)
// 第三页设置
let ThirdPage = conn.model('ThirdPage', ThirdPageSchema)
let FourthPage = conn.model('FourthPage', FourthPageSchema)
// 第五页设置
let FifthPage = conn.model('FifthPage', FifthPageSchema)
// 第六页设置
let SixthPage = conn.model('SixthPage', SixthPageSchema)
// 第七页设置
let SeventhPage = conn.model('SeventhPage', SeventhPageSchema)
let EighthPage = conn.model('EighthPage', EighthPageSchema)

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

// 第六页
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

// 第七页
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
    createEmailCode,
    updateEmailCode,
    checkEmailExist,
    checkCodeEffective,
    userLogin,
    userRegister,
    userCheckExist,
    checkUser,
    updateUserInfo,
    createFirstPageInfo,
    getFirstPageInfo,
    updateFirstPageInfo,
    getFifthPageInfo,
    createFifthPageInfo,
    updateFifthPageInfo,
    getSeventhPageInfo,
    createSeventhPageInfo,
    updateSeventhPageInfo,
    getSixthPageInfo,
    createSixthPageInfo,
    updateSixthPageInfo,
    createSecondPageInfo,
    getSecondPageInfo,
    updateSecondPageInfo,
    getThirdPageInfo,
    createThirdPageInfo,
    updateThirdPageInfo,
    getEighthPageInfo,
    updateEighthPageInfo,
    createEighthPageInfo,
    getFourthPageInfo,
    createFourthPageInfo,
    updateFourthPageInfo
}