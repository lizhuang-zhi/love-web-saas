const mongoose = require('../dao/page3')
const beforeRequestOtherApi = require('../utils/checkToken')
const fs = require("fs")

const {
    upload3Path,
    prefix,
    cloudBase
} = require('../utils/setting')

// 页面3 异步删除 uploads 下对应文件
const delUploadFile3 = async (fileName) => {
    fs.rm(upload3Path + `/${fileName}`, () => {
        console.log(`删除 uploads3 文件夹下的: ${fileName} 文件`);
    });
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
    if (fs.existsSync(upload3Path + `/${fileName}`)) {
        // 先上传云存储
        await cloudBase.uploadFile({
            cloudPath: `love-web-saas/${fileName}`,
            fileContent: fs.createReadStream(upload3Path + `/${fileName}`)
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
module.exports = {
    // uploads3 文件 
    upload3: async (ctx, next) => {
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
            if (!fs.existsSync(upload3Path)) {
                fs.mkdirSync(upload3Path);
            }
            upStream = fs.createWriteStream(upload3Path + `/${newFileName}`);
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
    },
    // 删除 uplods 文件夹中所有文件 
    delFileUpload3: async (ctx, next) => {
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
            if (fs.existsSync(upload3Path)) {
                fs.readdir(upload3Path, (err, files) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    for (let item of files) {
                        if (item.includes(userId)) {
                            fs.rm(upload3Path + `/${item}`, () => {
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
    },
    // 页面3 创建 上传视频
    createInfo3: async (ctx, next) => {
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
    },
    // 页面3 获取 上传视频
    getInfo3: async (ctx, next) => {
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
    },
    // 页面3 修改 上传视频
    updateInfo3: async (ctx, next) => {
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
}