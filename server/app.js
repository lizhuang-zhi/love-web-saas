const Koa = require('koa');
const route = require('koa-route');
const koaBody = require('koa-body');
const jwt = require('jsonwebtoken');

// 用于邮箱验证
const nodeMailer = require('nodemailer')
const app = new Koa();

// 导入mongoose.js
const mongoose = require('./mongoose');

// 密钥
const secretKey = "loveWebSecretKey";


// 腾讯云存储
const tcb = require("@cloudbase/node-sdk");
const fs = require("fs");
const cloudBase = tcb.init({
    env: "mrkleo-blog-2gw4gee4088deaca",
    region: "ap-guangzhou",
    secretId: "AKIDRjnQq56tSlpgKkwutgEYcVGqDLEsHemj",
    secretKey: "vc9Xi8PWTCkBSXRBi161iBPVP7cnnZAc"
});

var cors = require('koa2-cors');
app.use(cors());

// 云存储返回的url前缀名
const prefix = "http://6d72-mrkleo-blog-2gw4gee4088deaca-1308382458.tcb.qcloud.la/love-web-saas/";

// 判断用户登录状态
const checkUserStatus = async (ctx, next) => {
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
};
// 用户登录
const userLogin = async ctx => {
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
    delete userInfo.password;
    // 返回token
    ctx.body = {
        message: '登录成功',
        status: 200,
        data: {
            ...userInfo,
            token
        }
    }
};
// 验证一下验证码
const verifyEmailCodeCorrect = async (ctx, next) => {
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
}
// 用户注册
const userRegister = async (ctx, next) => {
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
};
// 验证邮箱是否已经注册
const verifyEmailExist = async ctx => {
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
}
// 发送验证码
const sendEmailCode = async ctx => {
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
}
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

// 创建第一页信息
const createInfo1 = async (ctx, next) => {
    let obj = ctx.request.body;
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    let result = await mongoose.createFirstPageInfo(obj);
    if (!result) {
        ctx.body = {
            message: '保存失败',
            status: 500
        }
        return
    }
    ctx.body = {
        message: '保存成功',
        status: 200
    }
}
// 获取第一页信息
const getInfo1 = async ctx => {
    let userId = ctx.request.body.userId;
    if (!userId) {
        ctx.body = {
            message: "userId参数没有携带",
            status: 404
        }
        return;
    }
    let result = await mongoose.getFirstPageInfo(userId);
    ctx.body = {
        message: "获取成功",
        status: 200,
        data: result ? result : null
    }
}
// 修改第一页信息
const updateInfo1 = async (ctx, next) => {
    let userId = ctx.request.body.userId;
    let themeContent = ctx.request.body.themeContent;
    let description = ctx.request.body.description;
    let btnContent = ctx.request.body.btnContent;
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    await mongoose.updateFirstPageInfo(userId, {
        themeContent,
        description,
        btnContent
    }).catch(err => {
        console.log(err);
    })
    ctx.body = {
        message: "修改成功",
        status: 200
    }
}

// 页面2 将文件上传到云存储 
const uplodFileToCloudBase2 = async (ctx, next) => {
    // 获取请求body
    let body = ctx.request.body;
    // 获取文件名, 判断是否上传该文件, 如果上传, 则在上传到云存储后删除
    let fileName = ctx.request.body.fileName;
    console.log(fileName);
    if (fileName == "") {
        return body;
    }
    if (fs.existsSync(`./uploads2/${fileName}`)) {
        // 先上传云存储
        await cloudBase.uploadFile({
            cloudPath: `love-web-saas/${fileName}`,
            fileContent: fs.createReadStream(`./uploads2/${fileName}`)
        })
        // 删除 upload 中对应文件
        delUploadFile2(fileName);
    }
    // 创建fileUrl
    let fileUrl = prefix + fileName;
    // 最后存储对象
    const obj = Object.assign(body, {
        fileUrl
    });
    return obj;
}
// 页面2 异步删除 uploads 下对应文件
const delUploadFile2 = async (fileName) => {
    fs.rm(`./uploads2/${fileName}`, () => {
        console.log(`删除 uploads2 文件夹下的: ${fileName} 文件`);
    });
}
// uploads2 文件
const upload2 = async (ctx, next) => {
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    try {
        // 获取用户的userId
        const userId = ctx.request.body.userId;
        // 获取上传文件
        const file = ctx.request.files.file;
        // 文件临时路径
        const fileTmpPath = file.path;
        // 文件名
        const fileName = file.name;
        // 创建可读流
        let readStream = fs.createReadStream(fileTmpPath)
        // 新建文件名
        const newFileName = userId + "-" + fileName;
        let upStream = null;
        // 先判断是否存在 uploads 文件夹
        if (!fs.existsSync("./uploads2")) {
            fs.mkdirSync("./uploads2");
        }
        upStream = fs.createWriteStream(`./uploads2/${newFileName}`);
        // 可读流通过管道写入可写流
        readStream.pipe(upStream);
        // 删除文件
        fs.rm(fileTmpPath, () => {
            console.log(`删除文件 ${fileTmpPath}`);
        })
    } catch (error) {
        console.log(error);
        ctx.body = {
            message: '上传失败',
            status: 500
        }
        return
    }
    ctx.body = {
        message: '上传成功',
        status: 200
    }
}
// 删除 uplods 文件夹所有文件
const delFileUpload2 = async (ctx, next) => {
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    // 获取用户id
    let userId = ctx.request.body.userId;
    try {
        if (fs.existsSync("./uploads2")) {
            fs.readdir(`./uploads2`, (err, files) => {
                if (err) {
                    console.log(err);
                    return;
                }
                for (let item of files) {
                    if (item.includes(userId)) {
                        fs.rm(`./uploads2/${item}`, () => {
                            console.log(`删除 ${item} 文件`);
                        });
                    }
                }
            })
        }
    } catch (error) {
        ctx.body = {
            message: "删除失败",
            status: 500
        }
        return;
    }
    ctx.body = {
        message: "删除成功",
        status: 200
    }
}
// 页面2 创建 上传视频
const createInfo2 = async (ctx, next) => {
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    // 上传文件到云存储
    let obj = await uplodFileToCloudBase2(ctx, next);
    let result = await mongoose.createSecondPageInfo(obj).catch(err => {
        console.log(err);
    });
    console.log(result);
    if (!result) {
        ctx.body = {
            message: "保存失败",
            status: 500
        }
        return;
    }
    ctx.body = {
        message: "保存成功",
        status: 200
    }
}
// 页面2 获取 上传视频
const getInfo2 = async (ctx, next) => {
    let userId = ctx.request.body.userId;
    if (!userId) {
        ctx.body = {
            message: "userId参数没有携带",
            status: 404
        }
        return;
    }
    let result = await mongoose.getSecondPageInfo(userId);
    ctx.body = {
        message: "获取成功",
        status: 200,
        data: result ? result : null
    }
}
// 页面2 修改 上传视频
const updateInfo2 = async (ctx, next) => {
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    // 上传文件到云存储
    let obj = await uplodFileToCloudBase2(ctx, next);
    await mongoose.updateSecondPageInfo(obj).catch(err => {
        console.log(err);
    })
    ctx.body = {
        message: "修改成功",
        status: 200
    }
}


// 页面3 将文件上传到云存储
const uplodFileToCloudBase3 = async (ctx, next) => {
    // 获取请求body
    let body = ctx.request.body;
    // 获取文件名, 判断是否上传该文件, 如果上传, 则在上传到云存储后删除
    let fileName = ctx.request.body.fileName;
    if (fileName == "") {
        return body;
    }
    if (fs.existsSync(`./uploads3/${fileName}`)) {
        // 先上传云存储
        await cloudBase.uploadFile({
            cloudPath: `love-web-saas/${fileName}`,
            fileContent: fs.createReadStream(`./uploads3/${fileName}`)
        })
        // 删除 upload 中对应文件
        delUploadFile3(fileName);
    }
    // 创建fileUrl
    let fileUrl = prefix + fileName;
    // 最后存储对象
    const obj = Object.assign(body, {
        fileUrl
    });
    return obj;
}
// 页面3 异步删除 uploads 下对应文件
const delUploadFile3 = async (fileName) => {
    fs.rm(`./uploads3/${fileName}`, () => {
        console.log(`删除 uploads3 文件夹下的: ${fileName} 文件`);
    });
}
// uploads3 文件 
const upload3 = async (ctx, next) => {
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    try {
        // 获取用户的userId
        const userId = ctx.request.body.userId;
        // 获取上传文件
        const file = ctx.request.files.file;
        // 文件临时路径
        const fileTmpPath = file.path;
        // 文件名
        const fileName = file.name;
        // 创建可读流
        let readStream = fs.createReadStream(fileTmpPath)
        // 新建文件名
        const newFileName = userId + "-" + fileName;
        let upStream = null;
        // 先判断是否存在 uploads 文件夹
        if (!fs.existsSync("./uploads3")) {
            fs.mkdirSync("./uploads3");
        }
        upStream = fs.createWriteStream(`./uploads3/${newFileName}`);
        // 可读流通过管道写入可写流
        readStream.pipe(upStream);
        // 删除文件
        fs.rm(fileTmpPath, () => {
            console.log(`删除文件 ${fileTmpPath}`);
        })
    } catch (error) {
        console.log(error);
        ctx.body = {
            message: '上传失败',
            status: 500
        }
        return
    }
    ctx.body = {
        message: '上传成功',
        status: 200
    }
}
// 删除 uplods 文件夹中所有文件 
const delFileUpload3 = async (ctx, next) => {
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    // 获取用户id
    let userId = ctx.request.body.userId;
    try {
        if (fs.existsSync("./uploads3")) {
            fs.readdir(`./uploads3`, (err, files) => {
                if (err) {
                    console.log(err);
                    return;
                }
                for (let item of files) {
                    if (item.includes(userId)) {
                        fs.rm(`./uploads3/${item}`, () => {
                            console.log(`删除 ${item} 文件`);
                        });
                    }
                }
            })
        }
    } catch (error) {
        ctx.body = {
            message: "删除失败",
            status: 500
        }
        return;
    }
    ctx.body = {
        message: "删除成功",
        status: 200
    }
}
// 页面3 创建 上传视频
const createInfo3 = async (ctx, next) => {
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    // 上传文件到云存储
    let obj = await uplodFileToCloudBase3(ctx, next);
    let result = await mongoose.createThirdPageInfo(obj).catch(err => {
        console.log(err);
    });
    console.log(result);
    if (!result) {
        ctx.body = {
            message: "保存失败",
            status: 500
        }
        return;
    }
    ctx.body = {
        message: "保存成功",
        status: 200
    }
}
// 页面3 获取 上传视频
const getInfo3 = async (ctx, next) => {
    let userId = ctx.request.body.userId;
    if (!userId) {
        ctx.body = {
            message: "userId参数没有携带",
            status: 404
        }
        return;
    }
    let result = await mongoose.getThirdPageInfo(userId);
    ctx.body = {
        message: "获取成功",
        status: 200,
        data: result ? result : null
    }
}
// 页面3 修改 上传视频
const updateInfo3 = async (ctx, next) => {
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    // 上传文件到云存储
    let obj = await uplodFileToCloudBase3(ctx, next);
    await mongoose.updateThirdPageInfo(obj).catch(err => {
        console.log(err);
    })
    ctx.body = {
        message: "修改成功",
        status: 200
    }
}


// 页面4 将文件上传到云存储
const uplodFileToCloudBase4 = async (ctx, next) => {
    // 获取请求body
    let body = ctx.request.body;
    // 获取数组
    let rotationMap = body.RotationMap;
    for (let i = 0; i < rotationMap.length; i++) {
        // 获取每个元素对象的上传文件的文件名
        let itemPicFileName = rotationMap[i].fileObj.name;
        if (itemPicFileName !== "" && fs.existsSync(`./rotations/${itemPicFileName}`)) {
            // 先上传云存储
            await cloudBase.uploadFile({
                cloudPath: `love-web-saas/${itemPicFileName}`,
                fileContent: fs.createReadStream(`./rotations/${itemPicFileName}`)
            })
            // 删除 upload 中对应文件
            fs.rm(`./rotations/${itemPicFileName}`, () => {
                console.log(`删除 rotations 文件夹下的 ${itemPicFileName}`);
            })
            // 获取图片链接地址
            let fileUrl = prefix + itemPicFileName;
            // 更新到数组中
            rotationMap[i].fileObj.url = fileUrl;
        }
    }
    return rotationMap;
}
// 页面4 异步删除 uploads 下单文件
const delUploadFileSingle4 = async (ctx, next) => {
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    // 获取用户id
    let fileName = ctx.request.body.fileName;
    try {
        if (fs.existsSync(`./rotations/${fileName}`)) {
            fs.rm(`./rotations/${fileName}`, () => {
                console.log(`删除 ${fileName} 文件`);
            });
        }
    } catch (error) {
        ctx.body = {
            message: "删除失败",
            status: 500
        }
        return;
    }
    ctx.body = {
        message: "删除成功",
        status: 200
    }
}
// 页面4 异步删除 uploads 下所有文件
const delUploadFile4 = async (ctx, next) => {
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    // 获取用户id
    let userId = ctx.request.body.userId;
    try {
        if (fs.existsSync("./rotations")) {
            fs.readdir(`./rotations`, (err, files) => {
                if (err) {
                    console.log(err);
                    return;
                }
                for (let item of files) {
                    if (item.includes(userId)) {
                        fs.rm(`./rotations/${item}`, () => {
                            console.log(`删除 ${item} 文件`);
                        });
                    }
                }
            })
        }
    } catch (error) {
        ctx.body = {
            message: "删除失败",
            status: 500
        }
        return;
    }
    ctx.body = {
        message: "删除成功",
        status: 200
    }
}
// rotations 文件 
const rotations = async (ctx, next) => {
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    let newFileName = "";
    try {
        // 获取用户的userId
        const userId = ctx.request.body.userId;
        // 获取上传文件
        const file = ctx.request.files.file;
        // 文件临时路径
        const fileTmpPath = file.path;
        // 文件名
        const fileName = file.name;
        // 创建可读流
        let readStream = fs.createReadStream(fileTmpPath)
        // 新建文件名
        newFileName = userId + "-" + fileName;
        let upStream = null;
        // 先判断是否存在 uploads 文件夹
        if (!fs.existsSync("./rotations")) {
            fs.mkdirSync("./rotations");
        }
        upStream = fs.createWriteStream(`./rotations/${newFileName}`);
        // 可读流通过管道写入可写流
        readStream.pipe(upStream);
        // 删除文件
        fs.rm(fileTmpPath, () => {
            console.log(`删除文件 ${fileTmpPath}`);
        })
    } catch (error) {
        console.log(error);
        ctx.body = {
            message: '上传失败',
            status: 500
        }
        return
    }
    ctx.body = {
        message: '上传成功',
        status: 200,
        data: {
            fileName: newFileName
        }
    }
}
// 页面4 创建 
const createInfo4 = async (ctx, next) => {
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    // 上传文件到云存储
    let rotationMap = await uplodFileToCloudBase4(ctx, next);
    let userId = ctx.request.body.userId;
    let result = await mongoose.createFourthPageInfo(userId, rotationMap).catch(err => {
        console.log(err);
    });
    console.log(result);
    if (!result) {
        ctx.body = {
            message: "保存失败",
            status: 500
        }
        return;
    }
    ctx.body = {
        message: "保存成功",
        status: 200
    }
}
// 页面4 获取 
const getInfo4 = async (ctx, next) => {
    let userId = ctx.request.body.userId;
    if (!userId) {
        ctx.body = {
            message: "userId参数没有携带",
            status: 404
        }
        return;
    }
    let result = await mongoose.getFourthPageInfo(userId);
    // 返回对应索引对象
    ctx.body = {
        message: "获取成功",
        status: 200,
        data: result ? result : null
    }
}
// 页面4 修改 
const updateInfo4 = async (ctx, next) => {
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    // 上传文件到云存储
    let rotationMap = await uplodFileToCloudBase4(ctx, next);
    let userId = ctx.request.body.userId;
    await mongoose.updateFourthPageInfo(userId, rotationMap).catch(err => {
        console.log(err);
    })
    ctx.body = {
        message: "修改成功",
        status: 200
    }
}

// 创建第五页信息
const createInfo5 = async (ctx, next) => {
    let obj = ctx.request.body;
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    let result = await mongoose.createFifthPageInfo(obj);
    if (!result) {
        ctx.body = {
            message: '保存失败',
            status: 500
        }
        return
    }
    ctx.body = {
        message: '保存成功',
        status: 200
    }
}
// 获取第五页信息
const getInfo5 = async ctx => {
    let userId = ctx.request.body.userId;
    if (!userId) {
        ctx.body = {
            message: "userId参数没有携带",
            status: 404
        }
        return;
    }
    let result = await mongoose.getFifthPageInfo(userId);
    ctx.body = {
        message: "获取成功",
        status: 200,
        data: result ? result : null
    }
}
// 修改第五页信息
const updateInfo5 = async (ctx, next) => {
    let userId = ctx.request.body.userId;
    let timeStamp = ctx.request.body.timeStamp;
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    await mongoose.updateFifthPageInfo(userId, timeStamp).catch(err => {
        console.log(err);
    })
    ctx.body = {
        message: "修改成功",
        status: 200
    }
}

// 创建第六页信息
const createInfo6 = async (ctx, next) => {
    let obj = ctx.request.body;
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    let result = await mongoose.createSixthPageInfo(obj);
    if (!result) {
        ctx.body = {
            message: '保存失败',
            status: 500
        }
        return
    }
    ctx.body = {
        message: '保存成功',
        status: 200
    }
}
// 获取第六页信息
const getInfo6 = async ctx => {
    let userId = ctx.request.body.userId;
    if (!userId) {
        ctx.body = {
            message: "userId参数没有携带",
            status: 404
        }
        return;
    }
    let result = await mongoose.getSixthPageInfo(userId);
    ctx.body = {
        message: "获取成功",
        status: 200,
        data: result ? result : null
    }
}
// 修改第六页信息
const updateInfo6 = async (ctx, next) => {
    let obj = ctx.request.body;
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    await mongoose.updateSixthPageInfo(obj).catch(err => {
        console.log(err);
    })
    ctx.body = {
        message: "修改成功",
        status: 200
    }
}

// 创建第七页信息
const createInfo7 = async (ctx, next) => {
    let obj = ctx.request.body;
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    let result = await mongoose.createSeventhPageInfo(obj);
    if (!result) {
        ctx.body = {
            message: '保存失败',
            status: 500
        }
        return
    }
    ctx.body = {
        message: '保存成功',
        status: 200
    }
}
// 获取第七页信息
const getInfo7 = async ctx => {
    let userId = ctx.request.body.userId;
    if (!userId) {
        ctx.body = {
            message: "userId参数没有携带",
            status: 404
        }
        return;
    }
    let result = await mongoose.getSeventhPageInfo(userId);
    ctx.body = {
        message: "获取成功",
        status: 200,
        data: result ? result : null
    }
}
// 修改第七页信息
const updateInfo7 = async (ctx, next) => {
    let userId = ctx.request.body.userId;
    let timeStamp = ctx.request.body.timeStamp;
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    await mongoose.updateSeventhPageInfo(userId, timeStamp).catch(err => {
        console.log(err);
    })
    ctx.body = {
        message: "修改成功",
        status: 200
    }
}

// 第八页 上传到相册
const uploadAlbum = async (ctx, next) => {
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    // 新建文件名
    let newFileName = "";
    try {
        // 获取用户的userId
        const userId = ctx.request.body.userId;
        // 获取上传文件
        const file = ctx.request.files.file;
        // 文件临时路径
        const fileTmpPath = file.path;
        // 文件名
        const fileName = file.name;
        // 创建可读流
        let readStream = fs.createReadStream(fileTmpPath)
        // 新建文件名
        newFileName = userId + "-" + fileName;
        let upStream = null;
        // 先判断是否存在 album 文件夹
        if (!fs.existsSync("./album")) {
            fs.mkdirSync("./album");
        }
        // 先判断是否存在该文件
        if (fs.existsSync(`./album/${newFileName}`)) {
            ctx.body = {
                message: "该文件已经存在, 请勿重复上传",
                status: 500
            }
            return;
        }
        upStream = fs.createWriteStream(`./album/${newFileName}`);
        // 可读流通过管道写入可写流
        readStream.pipe(upStream);
        // 删除临时文件
        fs.rm(fileTmpPath, () => {
            console.log(`删除文件 ${fileTmpPath}`);
        })
    } catch (error) {
        console.log(error);
        ctx.body = {
            message: '上传失败, 请稍后重试',
            status: 500
        }
        return
    }
    ctx.body = {
        message: '上传成功',
        status: 200,
        data: newFileName
    }
}
// 第八页 删除 /album 中对应的文件 
const delAlbumFile = async (ctx, next) => {
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    // 获取用户id
    let userId = ctx.request.body.userId;
    try {
        if (fs.existsSync("./album")) {
            fs.readdir(`./album`, (err, files) => {
                if (err) {
                    console.log(err);
                    return;
                }
                for (let item of files) {
                    if (item.includes(userId)) {
                        fs.rm(`./album/${item}`, () => {
                            console.log(`删除 ${item} 文件`);
                        });
                    }
                }
            })
        }
    } catch (error) {
        ctx.body = {
            message: "删除失败",
            status: 500
        }
        return;
    }
    ctx.body = {
        message: "删除成功",
        status: 200
    }
}
// 第八页 读取相册文件夹, 上传对应文件到云端
const readFileToCloud = async (userId, fileList) => {
    let fileArr = [];
    for (let item of fileList) {
        let fileObj = null;
        // 上传文件到服务器, 然后删除
        if (fs.existsSync(`./album/${item}`)) {
            // 先上传云存储
            fileObj = await cloudBase.uploadFile({
                cloudPath: `love-web-saas/${item}`,
                fileContent: fs.createReadStream(`./album/${item}`)
            })
        }
        // 删除对应文件
        fs.rm(`./album/${item}`, () => {
            console.log(`删除文件 ${item}`);
        })
        // 存储的文件对象
        let obj = {
            id: fileObj.fileID,
            name: item,
            status: "finished",
            url: prefix + item
        }
        fileArr.push(obj);
    }
    let result = await mongoose.createEighthPageInfo(userId, fileArr).catch(err => {
        console.log(err);
    })
    return result;
}
// 第八页 修改相册文件夹, 上传对应文件到云端
const updateFileListToCloud = async (userId, fileList) => {
    let fileArr = [];
    for (let item of fileList) {
        let fileObj = null;
        // 上传文件到服务器, 然后删除
        if (fs.existsSync(`./album/${item.name}`)) {
            // 先上传云存储
            fileObj = await cloudBase.uploadFile({
                cloudPath: `love-web-saas/${item.name}`,
                fileContent: fs.createReadStream(`./album/${item.name}`)
            })
            // 删除对应文件
            fs.rm(`./album/${item.name}`, () => {
                console.log(`删除文件 ${item.name}`);
            })
            // 存储的文件对象
            let obj = {
                id: fileObj.fileID,
                name: item.name,
                status: "finished",
                url: prefix + item.name
            }
            fileArr.push(obj);
        } else {
            // 文件已经上传过
            fileArr.push(item);
        }
    }
    console.log(fileArr);
    let result = await mongoose.updateEighthPageInfo(userId, fileArr).catch(err => {
        console.log(err);
    })
    return result;
}
// 页面8 上传相册
const createInfo8 = async (ctx, next) => {
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    console.log(ctx.request.body);
    let userId = ctx.request.body.userId;
    let fileList = ctx.request.body.fileList;
    // 上传文件到云存储
    let data = await readFileToCloud(userId, fileList);
    console.log(data);
    if (!data) {
        ctx.body = {
            message: "保存失败",
            status: 500
        }
        return;
    }
    ctx.body = {
        message: "保存成功",
        status: 200
    }
}
// 页面8 获取 上传相册
const getInfo8 = async (ctx, next) => {
    let userId = ctx.request.body.userId;
    if (!userId) {
        ctx.body = {
            message: "userId参数没有携带",
            status: 404
        }
        return;
    }
    let result = await mongoose.getEighthPageInfo(userId);
    ctx.body = {
        message: "获取成功",
        status: 200,
        data: result ? result : null
    }
}
// 页面8 修改 上传相册
const updateInfo8 = async (ctx, next) => {
    let judge = await beforeRequestOtherApi(ctx, next);
    if (!judge) {
        ctx.body = {
            message: '用户未认证',
            status: 401
        }
        return
    }
    console.log(ctx.request.body);
    let userId = ctx.request.body.userId;
    let fileList = ctx.request.body.fileList;
    // 上传文件到云存储
    let obj = await updateFileListToCloud(userId, fileList);
    console.log(obj);
    ctx.body = {
        message: "修改成功",
        status: 200
    }
}



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



app.use(koaBody({
    multipart: true, // 开启文件上传
    formidable: {
        maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
        keepExtensions: true // 保留文件拓展名
    }
}));

// 判断用户登录状态
app.use(route.get('/checkstatus', checkUserStatus));
// 用户登录
app.use(route.post('/login', userLogin));
// 用户注册
app.use(route.post('/register', userRegister));
// 验证邮箱是否已经注册
app.use(route.post('/email/exist', verifyEmailExist));
// 发送验证码
app.use(route.post('/email/send', sendEmailCode));
// 修改用户信息
app.use(route.post('/updateuserinfo', userInfoUpdate));

// 页面1
app.use(route.post('/createinfo/1', createInfo1));
app.use(route.post('/getinfo/1', getInfo1));
app.use(route.post('/updateinfo/1', updateInfo1));

// 页面2 上传视频
app.use(route.post('/upload/2', upload2));
app.use(route.post('/delfile/upload/2', delFileUpload2));
app.use(route.post('/createinfo/2', createInfo2));
app.use(route.post('/getinfo/2', getInfo2));
app.use(route.post('/updateinfo/2', updateInfo2));

// 页面3 上传视频
app.use(route.post('/upload/3', upload3));
app.use(route.post('/delfile/upload/3', delFileUpload3));
app.use(route.post('/createinfo/3', createInfo3));
app.use(route.post('/getinfo/3', getInfo3));
app.use(route.post('/updateinfo/3', updateInfo3));

// 页面4
app.use(route.post('/upload/4', rotations));
app.use(route.post('/delfile/upload/4', delUploadFile4));
app.use(route.post('/delfile/upload/single/4', delUploadFileSingle4));
app.use(route.post('/createinfo/4', createInfo4));
app.use(route.post('/getinfo/4', getInfo4));
app.use(route.post('/updateinfo/4', updateInfo4));

// 页面5
app.use(route.post('/createinfo/5', createInfo5));
app.use(route.post('/getinfo/5', getInfo5));
app.use(route.post('/updateinfo/5', updateInfo5));

// 页面6
app.use(route.post('/createinfo/6', createInfo6));
app.use(route.post('/getinfo/6', getInfo6));
app.use(route.post('/updateinfo/6', updateInfo6));

// 页面7
app.use(route.post('/createinfo/7', createInfo7));
app.use(route.post('/getinfo/7', getInfo7));
app.use(route.post('/updateinfo/7', updateInfo7));

// 页面8
app.use(route.post('/upload/album', uploadAlbum));
app.use(route.post('/delfile/album', delAlbumFile));
app.use(route.post('/createinfo/8', createInfo8));
app.use(route.post('/getinfo/8', getInfo8));
app.use(route.post('/updateinfo/8', updateInfo8));


app.listen(5001);