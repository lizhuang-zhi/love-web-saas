const route = require('koa-route')
const Page2Controller = require('../controller/page2');

module.exports = (app) => {
    // 页面2 上传视频
    app.use(route.post('/upload/2', Page2Controller.upload2))
        .use(route.post('/delfile/upload/2', Page2Controller.delFileUpload2))
        .use(route.post('/createinfo/2', Page2Controller.createInfo2))
        .use(route.post('/getinfo/2', Page2Controller.getInfo2))
        .use(route.post('/updateinfo/2', Page2Controller.updateInfo2))
}