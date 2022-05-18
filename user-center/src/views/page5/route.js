const BASE = "/page5";

export default [{
    name: "Page-5",
    path: BASE,
    component: () => import("./page-5.vue"),
    meta: {
        title: "routes.page",
        titleFormat: (title) => `${title}五`,
        icon: '<i class="ri-folder-3-line"></i>',
        i18n: true,
        requiresAuth: true,
    },
}, ];