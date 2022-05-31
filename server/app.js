const Koa = require('koa');
const koaBody = require('koa-body');
var cors = require('koa2-cors');
const app = new Koa();
app.use(cors());

app.use(koaBody({
    multipart: true, // 开启文件上传
    formidable: {
        maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
        keepExtensions: true // 保留文件拓展名
    }
}));

// 路由分层
const userRouter = require('./routers/user');
const page1Router = require('./routers/page1');
const page2Router = require('./routers/page2');
const page3Router = require('./routers/page3');
const page4Router = require('./routers/page4');
const page5Router = require('./routers/page5');
const page6Router = require('./routers/page6');
const page7Router = require('./routers/page7');
const page8Router = require('./routers/page8');
const detailsRouter = require('./routers/details');
userRouter(app);
page1Router(app);
page2Router(app);
page3Router(app);
page4Router(app);
page5Router(app);
page6Router(app);
page7Router(app);
page8Router(app);
detailsRouter(app);

app.listen(5001);