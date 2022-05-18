const BASE = "/page1";

export default [{
    name: "Page",
    path: BASE,
    component: () => import("./page-1.vue"),
    meta: {
        title: "routes.page",
        titleFormat: (title) => `${title}一`,
        icon: '<i class="ri-folder-3-line"></i>',
        i18n: true,
        requiresAuth: true,
    },
}];