const mongoose = require('../dao/page6')
const beforeRequestOtherApi = require('../utils/checkToken')

module.exports = {
    // 创建第六页信息
    createInfo6: async (ctx, next) => {
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
    },
    // 获取第六页信息
    getInfo6: async ctx => {
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
    },
    // 修改第六页信息
    updateInfo6: async (ctx, next) => {
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
}