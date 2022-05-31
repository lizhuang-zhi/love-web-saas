const mongoose = require('../dao/page5')
const beforeRequestOtherApi = require('../utils/checkToken')

module.exports = {
    // 创建第五页信息
    createInfo5: async (ctx, next) => {
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
    },
    // 获取第五页信息
    getInfo5: async ctx => {
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
    },
    // 修改第五页信息
    updateInfo5: async (ctx, next) => {
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
}