const BASE = "/page2";

export default [{
    name: "Page-2",
    path: BASE,
    component: () => import("./page-2.vue"),
    meta: {
        title: "routes.page",
        titleFormat: (title) => `${title}二`,
        icon: '<i class="ri-folder-3-line"></i>',
        i18n: true,
        requiresAuth: true,
    },
}, ];