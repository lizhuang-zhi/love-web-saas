const BASE = "/page4";

export default [{
    name: "Page-4",
    path: BASE,
    component: () => import("./page-4.vue"),
    meta: {
        title: "routes.page",
        titleFormat: (title) => `${title}四`,
        icon: '<i class="ri-folder-3-line"></i>',
        i18n: true,
        requiresAuth: true,
    },
}, ];