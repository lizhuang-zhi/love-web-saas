const route = require('koa-route')
const Page4Controller = require('../controller/page4');

module.exports = (app) => {
    // 页面4
    app.use(route.post('/upload/4', Page4Controller.rotations))
    .use(route.post('/delfile/upload/4', Page4Controller.delUploadFile4))
    .use(route.post('/delfile/upload/single/4', Page4Controller.delUploadFileSingle4))
    .use(route.post('/createinfo/4', Page4Controller.createInfo4))
    .use(route.post('/getinfo/4', Page4Controller.getInfo4))
    .use(route.post('/updateinfo/4', Page4Controller.updateInfo4))
}