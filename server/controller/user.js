const jwt = require('jsonwebtoken')
// 用于邮箱验证
const nodeMailer = require('nodemailer')
// 密钥
const secretKey = "loveWebSecretKey"
const mongoose = require('../dao/user')
// 执行涉及增删改其他接口前,判断用户权限
const beforeRequestOtherApi = require("../utils/checkToken")

module.exports = {
    // 判断用户登录状态
    checkUserStatus: async (ctx, next) => {
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
        if (!user) {
            ctx.body = {
                message: '服务器错误',
                status: 500,
            }
            return
        }
        ctx.body = {
            message: '用户已经是登录状态',
            status: 200,
            data: user
        }
    },
    // 用户登录
    userLogin: async ctx => {
        // 获取请求的用户名和密码
        const body = ctx.request.body;
        let res = await mongoose.userLogin(body.email, body.password);
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
        //返回信息
        let userInfo = {
            ...res["_doc"]
        };
        // delete userInfo.password;
        // 返回token
        ctx.body = {
            message: '登录成功',
            status: 200,
            data: {
                ...userInfo,
                token
            }
        }
    },
    // 验证一下验证码
    verifyEmailCodeCorrect: async (ctx, next) => {
        let body = ctx.request.body;
        // 获取邮箱
        let email = body.email;
        let code = body.code;
        let nowTime = body.nowTime;
        /* 
            先检查是否存在该 邮箱 和 验证码 是否存在
            - 存在, 往下判断时间是否有效
            - 不存在, 验证码有误
        */
        let result = await mongoose.checkCodeEffective(email, code);
        console.log(result);
        if (!result) {
            return {
                message: "验证码或邮箱输入有误, 请确认后重新输入",
                status: -1
            }
        } else {
            let expire = result.expire;
            // 验证时效性
            if (nowTime < expire) {
                return {
                    message: "验证码有效",
                    status: 1
                }
            } else {
                return {
                    message: "验证码已过期",
                    status: 0
                }
            }
        }
    },
    // 用户注册
    userRegister: async (ctx, next) => {
        // 验证码是否有效
        let result = await verifyEmailCodeCorrect(ctx, next);
        if (result.status == 0) {
            ctx.body = {
                message: result.message,
                status: 400
            }
            return;
        } else if (result.status == -1) {
            ctx.body = {
                message: result.message,
                status: 400
            }
            return;
        }
        let body = ctx.request.body;
        // 判断用户是否已经存在 (这一步是为了防止用同一个邮箱注册不同的账户)
        let checkUser = await mongoose.userCheckExist(body.email);
        if (checkUser) {
            ctx.body = {
                message: "该邮箱已被注册, 请勿重复注册",
                status: 400
            }
            return;
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
    },
    // 验证邮箱是否已经注册
    verifyEmailExist: async ctx => {
        let body = ctx.request.body;
        // 注册之前, 先用邮箱查看是否存在该用户
        let checkUser = await mongoose.userCheckExist(body.email);
        if (checkUser) {
            ctx.body = {
                message: '该邮箱已存在, 请勿重复注册',
                status: 400
            }
            return;
        }
        ctx.body = {
            message: '不存在该邮箱, 用户还未注册',
            status: 200
        }
        return;
    },
    // 发送验证码
    sendEmailCode: async ctx => {
        // post参数名
        const {
            email
        } = ctx.request.body;
        // 获取有效期时间
        let expireTimeToJudge = 0;
        // 获取验证码
        let verifyCode = "";
        // 配置参数
        const conf = {
            get user() {
                return '2315831906@qq.com'
            },
            get pass() { // smtp授权码，自行替换
                return 'abkunmmgcrhtdjgg'
            },
            get code() { // 验证码
                return () => {
                    verifyCode = Math.random().toString(16).slice(2, 6).toUpperCase();
                    return verifyCode;
                }
            },
            expire() { // 到期时间
                expireTimeToJudge = new Date().getTime() + (5 * 60 * 1000);
            },
            expireTime: 5 // 有效时长(分钟)
        }
        const transportOptions = {
            service: 'QQ', // no need to set host or port etc. 更多邮箱支持 https://nodemailer.com/smtp/well-known/
            auth: {
                user: conf.user, // 发件邮箱
                pass: conf.pass // smtp授权码
            }
        }
        // 邮件模版
        const sendMailOptions = {
            from: `"Love Web认证邮件"<${conf.user}>`, // 发件人
            to: email, // 收件人
            subject: '注册验证', // 邮件主题
            html: `<h3>注册验证码是: ${conf.code()}, 有效期为${conf.expireTime}分钟</h3>` // 邮件内容
        }
        // create reusable transporter
        let transporter = nodeMailer.createTransport(transportOptions)
        try {
            // send mail
            let info = await transporter.sendMail(sendMailOptions)
            console.log(info);
            if (info) {
                // 设置有效期时间
                conf.expire();
                // 检查是否存在该邮箱
                let isExistEmail = await mongoose.checkEmailExist(email);
                console.log(isExistEmail);
                if (!isExistEmail) {
                    console.log(typeof expireTimeToJudge);
                    // 不存在该邮箱
                    await mongoose.createEmailCode(email, verifyCode, expireTimeToJudge)
                } else {
                    // 存在该邮箱, 更新验证码和过期时间
                    await mongoose.updateEmailCode(email, verifyCode, expireTimeToJudge)
                }
                ctx.body = {
                    message: '验证码发送成功, 请注意在邮箱中查收',
                    status: 200,
                    data: {
                        expire: expireTimeToJudge
                    }
                }
            }
        } catch (error) {
            console.log(error)
            ctx.body = {
                message: '验证码发送失败，请检查邮箱是否存在',
                status: 500,
            }
        }
    },
    // 修改用户信息
    userInfoUpdate: async ctx => {
        let body;
        if (ctx.request.body) {
            // 获取请求的数据
            body = ctx.request.body;
        }
        // 查询是否存在该用户
        let isExistUser = await mongoose.checkUser(body.userId).catch(err => {
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
    } 
}