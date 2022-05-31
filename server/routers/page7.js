const route = require('koa-route')
const Page7Controller = require('../controller/page7');

module.exports = (app) => {
    app.use(route.post('/createinfo/7', Page7Controller.createInfo7))
        .use(route.post('/getinfo/7', Page7Controller.getInfo7))
        .use(route.post('/updateinfo/7', Page7Controller.updateInfo7))
}