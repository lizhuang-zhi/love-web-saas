const route = require('koa-route')
const Page3Controller = require('../controller/page3');

module.exports = (app) => {
    // 页面3 上传视频
    app.use(route.post('/upload/3', Page3Controller.upload3))
    .use(route.post('/delfile/upload/3', Page3Controller.delFileUpload3))
    .use(route.post('/createinfo/3', Page3Controller.createInfo3))
    .use(route.post('/getinfo/3', Page3Controller.getInfo3))
    .use(route.post('/updateinfo/3', Page3Controller.updateInfo3))
}