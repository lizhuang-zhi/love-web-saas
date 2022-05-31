const jwt = require('jsonwebtoken')

// 密钥(公用的判断jwt中使用了)
const secretKey = "loveWebSecretKey";

// 执行涉及增删改其他接口前,判断用户权限
module.exports = async (ctx, next) => {
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