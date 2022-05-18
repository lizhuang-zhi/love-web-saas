const BASE = "/page8";

export default [{
    name: "Page-8",
    path: BASE,
    component: () => import("./page-8.vue"),
    meta: {
        title: "routes.page",
        titleFormat: (title) => `${title}八`,
        icon: '<i class="ri-folder-3-line"></i>',
        i18n: true,
        requiresAuth: true,
    },
}, ];