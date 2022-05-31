const route = require('koa-route')
const Page1Controller = require('../controller/page1');

module.exports = (app) => {
    // 页面1
    app.use(route.post('/createinfo/1', Page1Controller.createInfo1))
    .use(route.post('/getinfo/1', Page1Controller.getInfo1))
    .use(route.post('/updateinfo/1', Page1Controller.updateInfo1))
}