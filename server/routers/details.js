const route = require('koa-route')
const DetailsController = require('../controller/details');

module.exports = (app) => {
    // 细节设置页面
    app.use(route.post('/createinfo/details', DetailsController.createInfoDetails))
        .use(route.post('/getinfo/details', DetailsController.getInfoDetails))
        .use(route.post('/updateinfo/details', DetailsController.updateInfoDetails))
}