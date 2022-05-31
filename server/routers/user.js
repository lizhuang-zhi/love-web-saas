const route = require('koa-route')
const UserController = require('../controller/user');

module.exports = (app) => {
    // 判断用户登录状态
    app.use(route.get('/checkstatus', UserController.checkUserStatus))
        // 用户登录
        .use(route.post('/login', UserController.userLogin))
        // 用户注册
        .use(route.post('/register', UserController.userRegister))
        // 验证邮箱是否已经注册
        .use(route.post('/email/exist', UserController.verifyEmailExist))
        // 发送验证码
        .use(route.post('/email/send', UserController.sendEmailCode))
        // 修改用户信息
        .use(route.post('/updateuserinfo', UserController.userInfoUpdate))
}