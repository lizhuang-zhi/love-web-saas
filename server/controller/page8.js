const mongoose = require('../dao/page8')
const beforeRequestOtherApi = require('../utils/checkToken')
const fs = require("fs")

const {
    albumPath,
    prefix,
    cloudBase
} = require('../utils/setting')


// 第八页 读取相册文件夹, 上传对应文件到云端
const readFileToCloud = async (userId, fileList) => {
    let fileArr = [];
    for (let item of fileList) {
        let fileObj = null;
        // 上传文件到服务器, 然后删除
        if (fs.existsSync(albumPath + `/${item}`)) {
            // 先上传云存储
            fileObj = await cloudBase.uploadFile({
                cloudPath: `love-web-saas/${item}`,
                fileContent: fs.createReadStream(albumPath + `/${item}`)
            })
        }
        // 删除对应文件
        fs.rm(albumPath + `/${item}`, () => {
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
        if (fs.existsSync(albumPath + `/${item.name}`)) {
            // 先上传云存储
            fileObj = await cloudBase.uploadFile({
                cloudPath: `love-web-saas/${item.name}`,
                fileContent: fs.createReadStream(albumPath + `/${item.name}`)
            })
            // 删除对应文件
            fs.rm(albumPath + `/${item.name}`, () => {
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
module.exports = {
    // 第八页 上传到相册
    uploadAlbum: async (ctx, next) => {
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
            if (!fs.existsSync(albumPath)) {
                fs.mkdirSync(albumPath);
            }
            // 先判断是否存在该文件
            if (fs.existsSync(albumPath + `/${newFileName}`)) {
                ctx.body = {
                    message: "该文件已经存在, 请勿重复上传",
                    status: 500
                }
                return;
            }
            upStream = fs.createWriteStream(albumPath + `/${newFileName}`);
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
    },
    // 第八页 删除 /album 中对应的文件 
    delAlbumFile: async (ctx, next) => {
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
            if (fs.existsSync(albumPath)) {
                fs.readdir(albumPath, (err, files) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    for (let item of files) {
                        if (item.includes(userId)) {
                            fs.rm(albumPath + `/${item}`, () => {
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
    // 页面8 上传相册
    createInfo8: async (ctx, next) => {
        let judge = await beforeRequestOtherApi(ctx, next);
        if (!judge) {
            ctx.body = {
                message: '用户未认证',
                status: 401
            }
            return
        }
        console.log(ctx.request.body);
        let {
            userId,
            fileList
        } = ctx.request.body
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
    },
    // 页面8 获取 上传相册
    getInfo8: async (ctx, next) => {
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
    },
    // 页面8 修改 上传相册
    updateInfo8: async (ctx, next) => {
        let judge = await beforeRequestOtherApi(ctx, next);
        if (!judge) {
            ctx.body = {
                message: '用户未认证',
                status: 401
            }
            return
        }
        console.log(ctx.request.body);
        let {
            userId,
            fileList
        } = ctx.request.body
        // 上传文件到云存储
        let obj = await updateFileListToCloud(userId, fileList);
        console.log(obj);
        ctx.body = {
            message: "修改成功",
            status: 200
        }
    }
}