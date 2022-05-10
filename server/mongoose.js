var mongoose = require('mongoose')

// 创建node链接mongo
const conn = mongoose.createConnection("mongodb://localhost:27017/loveWeb")

// 1. 创建骨架
let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    createAt: {
        type: Date,
        default: Date.now
    },
})

// 2. 操作集合 “模型”去操作集合  => 返回集合
let User = conn.model('User', UserSchema)

function userLogin(usernmae, password) {
    return User.findOne({
        username: usernmae,
        password: password
    })
}

function userRegister(account) {
    return User.create({
        username: account.username,
        password: account.password,
        email: account.email,
    })
}

function updateUserInfo(account) {
    return User.updateOne({
        _id: account.profileId
    },{
        username: account.username,
        firstName: account.firstName,
        lastName: account.lastName
    })
}

function checkUser(user_id) {
    return User.findById({
        _id: user_id
    })
}

// function addArticle(article) {
//     return Article.create({
//         // 图片url
//         blogCoverPhoto: article.blogCoverPhoto,
//         // 图片名  mac壁纸.png
//         blogCoverPhotoName: article.blogCoverPhotoName,
//         // 博客内容
//         blogHTML: article.blogHTML,
//         blogTitle: article.blogTitle,
//         // 时间戳字符串
//         date: article.date,
//         // 发布用户id
//         profileId: article.profileId,
//     })
// }

// function deleteArticle(articleId) {
//     return Article.deleteOne({
//         _id: articleId
//     })
// }

// function updateArticle(articleId, updateObj) {
//     return Article.updateOne({
//         _id: articleId
//     }, {
//         // 图片url
//         blogCoverPhoto: updateObj.blogCoverPhoto,
//         // 图片名  mac壁纸.png
//         blogCoverPhotoName: updateObj.blogCoverPhotoName,
//         // 博客内容
//         blogHTML: updateObj.blogHTML,
//         blogTitle: updateObj.blogTitle,
//         // 时间戳字符串
//         date: updateObj.date,
//         // 发布用户id
//         profileId: updateObj.profileId,
//     })
// }

// function findOneArticle(articleId) {
//     return Article.findOne({
//         _id: articleId
//     })
// }

// function findAllArticle() {
//     return Article.find({})
// }

module.exports = {
    userLogin,
    userRegister,
    checkUser,
    updateUserInfo
}