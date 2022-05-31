const route = require('koa-route')
const Page6Controller = require('../controller/page6');

module.exports = (app) => {
    // 页面6
    app.use(route.post('/createinfo/6', Page6Controller.createInfo6))
    .use(route.post('/getinfo/6', Page6Controller.getInfo6))
    .use(route.post('/updateinfo/6', Page6Controller.updateInfo6))
}