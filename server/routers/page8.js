const route = require('koa-route')
const Page8Controller = require('../controller/page8');

module.exports = (app) => {
    // 页面8
    app.use(route.post('/upload/album', Page8Controller.uploadAlbum))
        .use(route.post('/delfile/album', Page8Controller.delAlbumFile))
        .use(route.post('/createinfo/8', Page8Controller.createInfo8))
        .use(route.post('/getinfo/8', Page8Controller.getInfo8))
        .use(route.post('/updateinfo/8', Page8Controller.updateInfo8))
}