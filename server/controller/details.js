const mongoose = require('../dao/details')
const beforeRequestOtherApi = require('../utils/checkToken')

module.exports = {
    // 创建其他细节设置页信息
    createInfoDetails: async (ctx, next) => {
        let judge = await beforeRequestOtherApi(ctx, next);
        if (!judge) {
            ctx.body = {
                message: '用户未认证',
                status: 401
            }
            return
        }
        let obj = ctx.request.body;
        let result = await mongoose.createDetailsPageInfo(obj);
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
    // 获取其他细节设置页信息
    getInfoDetails: async ctx => {
        let userId = ctx.request.body.userId;
        if (!userId) {
            ctx.body = {
                message: "userId参数没有携带",
                status: 404
            }
            return;
        }
        let result = await mongoose.getDetailsPageInfo(userId);
        ctx.body = {
            message: "获取成功",
            status: 200,
            data: result ? result : null
        }
    },
    // 修改其他细节设置页信息
    updateInfoDetails: async (ctx, next) => {
        let judge = await beforeRequestOtherApi(ctx, next);
        if (!judge) {
            ctx.body = {
                message: '用户未认证',
                status: 401
            }
            return
        }
        let userId = ctx.request.body.userId;
        let headTitle = ctx.request.body.headTitle;
        try {
            await mongoose.updateDetailsPageInfo(userId, {
                headTitle
            });
        } catch (error) {
            ctx.body = {
                message: "修改失败",
                status: 500
            }
            return;
        }
        ctx.body = {
            message: "修改成功",
            status: 200
        }
    }
}