const route = require('koa-route')
const Page5Controller = require('../controller/page5');

module.exports = (app) => {
    app.use(route.post('/createinfo/5', Page5Controller.createInfo5))
        .use(route.post('/getinfo/5', Page5Controller.getInfo5))
        .use(route.post('/updateinfo/5', Page5Controller.updateInfo5))
}