const Koa = require('koa');
const app = new Koa();

const route = require('koa-route');
const koaBody = require('koa-body');
const jwt = require('jsonwebtoken');

// 导入mongoose.js
const mongoose = require('./mongoose');

// 密钥
const secretKey = "loveWebSecretKey";

var cors = require('koa2-cors');
app.use(cors());

// 判断用户登录状态
const checkUserStatus = async (ctx,next) => {
    /* 
        先通过token判断
    */
    let isJuris = await beforeRequestOtherApi(ctx, next);
    if (!isJuris) {
        ctx.body = {
            message: '还未登录或登录过期',
            status: 401
        }
        return;
    }
    // 如果已经是登录状态, 获取用户id
    let userId = isJuris;
    let user = await mongoose.checkUser(userId).catch(err => {
        console.log(err);
    });
    ctx.body = {
        message: '用户已经是登录状态',
        status: 200,
        userInfo: user
    }
};
// 用户登录
const userLogin = async ctx => {
    // 获取请求的用户名和密码
    const body = ctx.request.body;
    let res = await mongoose.userLogin(body.username, body.password);
    // 未找到对应用户
    if (!res) {
        ctx.body = {
            message: '用户名或密码错误',
            status: 404
        };
        return;
    }
    // 整理打包需要存储的信息
    let jwtSaveData = {
        userId: res._id,
    }
    // jwt签发token
    let token = jwt.sign({
        // token过期时间
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: jwtSaveData
    }, secretKey);
    // 返回token
    ctx.body = {
        message: '登录成功',
        status: 200,
        userInfo: res,
        token
    }
};
// 用户注册
const userRegister = async ctx => {
    let body;
    if (ctx.request.body) {
        // 获取请求的数据
        body = ctx.request.body;
    }
    try {
        await mongoose.userRegister(body);
    } catch (error) {
        console.log(error)
        ctx.body = {
            message: '未知错误',
            status: 500
        }
        return;
    }
    ctx.body = {
        message: '注册成功',
        status: 200
    }
};
// 修改用户信息
const userInfoUpdate = async ctx => {
    let body;
    if (ctx.request.body) {
        // 获取请求的数据
        body = ctx.request.body;
    }
    // 查询是否存在该用户
    let isExistUser = await mongoose.checkUser(body.profileId).catch(err => {
        // 找到异常, 但是不会直接让程序死掉
        console.log(err);
    });
    if (!isExistUser) {
        ctx.body = {
            message: '用户不存在',
            status: 404
        }
        return;
    }
    try {
        await mongoose.updateUserInfo(body);
    } catch (error) {
        console.log(error)
        ctx.body = {
            message: '未知错误',
            status: 500
        }
        return;
    }
    ctx.body = {
        message: '用户信息更新成功',
        status: 200
    }
};
// 执行涉及增删改其他接口前,判断用户权限
const beforeRequestOtherApi = async (ctx, next) => {
    var decoded = null;
    var userId = "";
    try {
        // 参数放在请求体中,后期要修改为请求头中
        let token = ctx.request.header.authorization;
        // 捕获无效签名token
        decoded = jwt.verify(token, secretKey);
        userId = decoded.data.userId;
        if (userId) {
            return userId
        }
    } catch (error) {
        console.log(error);
        return false
    }
}

app.use(koaBody());
// 判断用户登录状态
app.use(route.get('/checkstatus', checkUserStatus));
// 用户登录
app.use(route.post('/login', userLogin));
// 用户注册
app.use(route.post('/register', userRegister));
// 修改用户信息
app.use(route.post('/updateuserinfo', userInfoUpdate));

app.listen(5001);