const mongoose = require('../dao/page4')
const beforeRequestOtherApi = require('../utils/checkToken')
const fs = require("fs")

const {
    rotationsPath,
    prefix,
    cloudBase
} = require('../utils/setting')

// 页面4 将文件上传到云存储
const uplodFileToCloudBase4 = async (ctx, next) => {
    // 获取请求body
    let body = ctx.request.body;
    // 获取数组
    let rotationMap = body.RotationMap;
    for (let i = 0; i < rotationMap.length; i++) {
        // 获取每个元素对象的上传文件的文件名
        let itemPicFileName = rotationMap[i].fileObj.name;
        if (itemPicFileName !== "" && fs.existsSync(rotationsPath + `/${itemPicFileName}`)) {
            // 先上传云存储
            await cloudBase.uploadFile({
                cloudPath: `love-web-saas/${itemPicFileName}`,
                fileContent: fs.createReadStream(rotationsPath + `/${itemPicFileName}`)
            })
            // 删除 upload 中对应文件
            fs.rm(rotationsPath + `/${itemPicFileName}`, () => {
                console.log(`删除 rotations 文件夹下的 ${itemPicFileName}`);
            })
            // 获取图片链接地址
            let fileUrl = prefix + itemPicFileName;
            // 更新到数组中
            rotationMap[i].fileObj.url = fileUrl;
        }
    }
    return rotationMap;
};

module.exports = {
    // 页面4 异步删除 uploads 下单文件
    delUploadFileSingle4: async (ctx, next) => {
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
            if (fs.existsSync(rotationsPath + `/${fileName}`)) {
                fs.rm(rotationsPath + `/${fileName}`, () => {
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
    },
    // 页面4 异步删除 uploads 下所有文件
    delUploadFile4: async (ctx, next) => {
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
            if (fs.existsSync(rotationsPath)) {
                fs.readdir(rotationsPath, (err, files) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    for (let item of files) {
                        if (item.includes(userId)) {
                            fs.rm(rotationsPath + `/${item}`, () => {
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
    // rotations 文件 
    rotations: async (ctx, next) => {
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
            if (!fs.existsSync(rotationsPath)) {
                fs.mkdirSync(rotationsPath);
            }
            upStream = fs.createWriteStream(rotationsPath + `/${newFileName}`);
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
    },
    // 页面4 创建 
    createInfo4: async (ctx, next) => {
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
    },
    // 页面4 获取 
    getInfo4: async (ctx, next) => {
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
    },
    // 页面4 修改 
    updateInfo4: async (ctx, next) => {
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
}