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

Router.beforeEach(async (to, from, next) => {
    // 登录后, 会设置的 userId
    let token = Store.state.user.token;
    // 页面需要登录
    if(to.matched.some(item => item.meta.requiresAuth)) {
        // 用户登录
        if(token) {
            return next();
        }
        // 用户未登录
        return next({ name: "Login" })
    }
    // 页面不需要登录,就可以进
    return next();
});

Router.afterEach((to) => {
    let { title, i18n } = to?.meta;
    title = i18n ? Locale.global.t(title) : title;
    document.title = `${APP_TITLE} ${title}`;
});

export default Router;
