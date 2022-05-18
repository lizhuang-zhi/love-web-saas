const BASE = "/page3";

export default [{
    name: "Page-3",
    path: BASE,
    component: () => import("./page-3.vue"),
    meta: {
        title: "routes.page",
        titleFormat: (title) => `${title}三`,
        icon: '<i class="ri-folder-3-line"></i>',
        i18n: true,
        requiresAuth: true,
    },
}, ];