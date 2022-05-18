const BASE = "/page6";

export default [{
    name: "Page-6",
    path: BASE,
    component: () => import("./page-6.vue"),
    meta: {
        title: "routes.page",
        titleFormat: (title) => `${title}六`,
        icon: '<i class="ri-folder-3-line"></i>',
        i18n: true,
        requiresAuth: true,
    },
}, ];