const BASE = "/page7";

export default [{
    name: "Page-7",
    path: BASE,
    component: () => import("./page-7.vue"),
    meta: {
        title: "routes.page",
        titleFormat: (title) => `${title}七`,
        icon: '<i class="ri-folder-3-line"></i>',
        i18n: true,
        requiresAuth: true,
    },
}];