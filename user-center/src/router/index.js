import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { APP_TITLE, ON_PERMISSION } from "@/settings.js";
import { getUserToken } from "@/utils/auth.js";
import { hasPermission } from "./permission";
import { CheckStatus } from '@/api/user'
import Locale from "@/locale";
import Store from "@/store";

const Router = createRouter({
    history: createWebHistory(),
    routes,
});

// Router.beforeEach(async (to, from, next) => {
//     // 验证 token 的有效性, 然后初始化用户信息
//     let user = await CheckStatus();
//     console.log(user);
//     // token 有效
//     // if(user.status == 200) {
//     //     Store.dispatch("user/INITUSERINFO", user);
//     //     next();
//     // }else if(to.name == "Login" && user.status != 200) {
//     //     next({ name: "Login" })
//     // }else if(to.name == "Register" && user.status != 200) {
//     //     next({ name: "Register" })
//     // }else {
//     //     // 
//     //     next({ name: "Login" })
//     // }
// });

Router.afterEach((to) => {
    let { title, i18n } = to?.meta;
    title = i18n ? Locale.global.t(title) : title;
    document.title = `${APP_TITLE} ${title}`;
});

export default Router;
