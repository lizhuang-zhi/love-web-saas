const BASE = "/menu";

export default [
    {
        name: "Menu",
        path: BASE,
        redirect: `${BASE}/1`,
        component: () => import("./index.vue"),
        meta: {
            title: "routes.page",
            titleFormat: (title) => `${title}设置`,
            icon: '<i class="ri-folder-3-line"></i>',
            i18n: true,
        },
        children: [
            {
                name: "Page-1",
                path: `${BASE}/1`,
                component: () => import("./page-1.vue"),
                meta: {
                    title: "routes.page",
                    titleFormat: (title) => `${title} I`,
                    auth: [],
                    i18n: true,
                },
            },
            {
                name: "Page-2",
                path: `${BASE}/2`,
                component: () => import("./page-2.vue"),
                meta: {
                    title: "routes.page",
                    titleFormat: (title) => `${title} II`,
                    auth: [],
                    i18n: true,
                },
            },
            {
                name: "Page-3",
                path: `${BASE}/3`,
                component: () => import("./page-3.vue"),
                meta: {
                    title: "routes.page",
                    titleFormat: (title) => `${title} III`,
                    auth: [],
                    i18n: true,
                },
            },
            {
                name: "Page-4",
                path: `${BASE}/4`,
                component: () => import("./page-4.vue"),
                meta: {
                    title: "routes.page",
                    titleFormat: (title) => `${title} IIII`,
                    auth: [],
                    i18n: true,
                },
            },
            {
                name: "Page-5",
                path: `${BASE}/5`,
                component: () => import("./page-5.vue"),
                meta: {
                    title: "routes.page",
                    titleFormat: (title) => `${title} IIIII`,
                    auth: [],
                    i18n: true,
                },
            },
            {
                name: "Page-6",
                path: `${BASE}/6`,
                component: () => import("./page-6.vue"),
                meta: {
                    title: "routes.page",
                    titleFormat: (title) => `${title} IIIIII`,
                    auth: [],
                    i18n: true,
                },
            },
            {
                name: "Page-7",
                path: `${BASE}/7`,
                component: () => import("./page-7.vue"),
                meta: {
                    title: "routes.page",
                    titleFormat: (title) => `${title} IIIIIII`,
                    auth: [],
                    i18n: true,
                },
            },
            {
                name: "Page-8",
                path: `${BASE}/8`,
                component: () => import("./page-8.vue"),
                meta: {
                    title: "routes.page",
                    titleFormat: (title) => `${title} IIIIIIII`,
                    auth: [],
                    i18n: true,
                },
            },
        ],
    },
];
