const {
    resolve
} = require('path')
// 腾讯云存储
const tcb = require("@cloudbase/node-sdk")
const cloudBase = tcb.init({
    env: "mrkleo-blog-2gw4gee4088deaca",
    region: "ap-guangzhou",
    secretId: "",
    secretKey: ""
})

module.exports = {
    // 对应文件夹
    upload2Path: resolve(__dirname, '../uploads2'),
    upload3Path: resolve(__dirname, '../uploads3'),
    rotationsPath: resolve(__dirname, '../rotations'),
    albumPath: resolve(__dirname, '../album'),
    // 云存储返回的url前缀名
    prefix: "http://6d72-mrkleo-blog-2gw4gee4088deaca-1308382458.tcb.qcloud.la/love-web-saas/",
    // 腾讯云存储
    cloudBase: cloudBase,
}