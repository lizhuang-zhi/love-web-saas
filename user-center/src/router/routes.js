import Main from "@/views/main/index.vue";

import Dashboard from "@/views/dashboard/route";
import User from "@/views/user/route";
import Setting from "@/views/settings/route";

// 页面1 - 页面8
import Page1 from "@/views/page1/route";
import Page2 from "@/views/page2/route";
import Page3 from "@/views/page3/route";
import Page4 from "@/views/page4/route";
import Page5 from "@/views/page5/route";
import Page6 from "@/views/page6/route";
import Page7 from "@/views/page7/route";
import Page8 from "@/views/page8/route";

/**
 * ${param} meta:
 * title: String
 * titleFormat Function 配合i18n合成字符串
 * auth: Array[] 权限
 * i18n: Boolean 页面标题是否是i18n识别
 * icon: String('<i class="ri-hotel-fill"></i>')
 * noCached: Boolean 不缓存，默认false
 * hide: Boolean 在侧边栏菜单隐藏，默认false
 */
export default [{
        name: "Main",
        path: "/",
        component: Main,
        meta: {
            title: "routes.dashboard",
            i18n: true,
            requiresAuth: true,
        },
        children: [
            ...Dashboard, 
            ...Page1, 
            ...Page2,
            ...Page3,
            ...Page4,
            ...Page5,
            ...Page6,
            ...Page7,
            ...Page8,
            ...User, 
            ...Setting],
    },
    {
        name: "Login",
        path: "/login",
        component: () => import("@/views/login/index.vue"),
        meta: {
            title: "common.sign_in",
            i18n: true,
            requiresAuth: false,
        },
    },
    {
        name: "Register",
        path: "/register",
        component: () => import("@/views/register/index.vue"),
        meta: {
            title: "common.sign_up",
            i18n: true,
            requiresAuth: false,
        },
    },
    {
        name: "404",
        path: "/:pathMatch(.*)*",
        component: () => import("@/views/404/index.vue"),
        meta: {
            title: "404",
            requiresAuth: false,
        },
    },
];