import {
    defineConfig,
} from "vite";
import {
    resolve
} from "path";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";

const ENV = {};
// Base
ENV.VITE_BASE_URL = "";
// 打包输出文件夹
ENV.VITE_OUTPUT_DIR = "docs";
// Server 配置
ENV.VITE_BASE_API_HOST = "http://162.14.99.93:5001";
ENV.VITE_BASE_API_PATH = "/api";

export default defineConfig({
    base: ENV.VITE_BASE_URL,
    // 打包配置
    build: {
        target: 'modules',
        assetsDir: "assets",
        outDir: ENV.VITE_OUTPUT_DIR,
        minify: 'terser', // 混淆器，terser构建后文件体积更小
    },
    // 插件配置
    plugins: [
        vue(),
        vueI18n({
            runtimeOnly: false,
            include: resolve(__dirname, "./src/locale/lang/*"),
        }),
    ],
    // 
    resolve: {
        alias: {
            "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
            "~": resolve(__dirname, "./"),
            "@": resolve(__dirname, "./src"),
        },
    },
    server: {
        cors: true, // 默认启用并允许任何源
        open: true,
        proxy: {
            [ENV.VITE_BASE_API_PATH]: {
                target: ENV.VITE_BASE_API_HOST,
                changeOrigin: true,
                rewrite: (path) =>
                    path.replace(
                        new RegExp(`^${ENV.VITE_BASE_API_PATH}`),
                        ""
                    ),
            },
        },
    },
});