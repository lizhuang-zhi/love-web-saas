const BASE = "/details";

export default [{
    name: "Details",
    path: BASE,
    component: () => import("./index.vue"),
    meta: {
        title: "routes.details",
        titleFormat: (title) => `${title}`,
        icon: '<i class="ri-folder-3-line"></i>',
        i18n: true,
        requiresAuth: true,
    },
}];

