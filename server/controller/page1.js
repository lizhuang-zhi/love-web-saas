const mongoose = require('../dao/page1')
const beforeRequestOtherApi = require('../utils/checkToken')

module.exports = {
    // 创建第一页信息
    createInfo1: async (ctx, next) => {
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
    },
    // 获取第一页信息
    getInfo1: async ctx => {
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
    },
    // 修改第一页信息
    updateInfo1: async (ctx, next) => {
        let {
            userId,
            themeContent,
            description,
            btnContent
        } = ctx.request.body;
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
}