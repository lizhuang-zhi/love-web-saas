export const LS_KEY = "RHO-SETTINGS";

export const APP_NAME = "Just Love 网站";

export const APP_TITLE = "Love Web";

export const ON_PERMISSION = true;

export const ROUTE_WHITE_NAME_LIST = ["/", "/login", "/404"];

export const ERROR_IMG = "https://tva1.sinaimg.cn/large/e6c9d24ely1h1wgkg59bgj20u023zjvr.jpg";

// 服务器接口地址
// export const API_BASE_URL = "http://162.14.99.93:5001";
// 本地测试接口地址
export const API_BASE_URL = "http://127.0.0.1:5001";

const CONFIGS = {
    theme: "", // theme-dark
    locale: "cn",
};

function initConfigs() {
    const LocalConfigs = localStorage.getItem(LS_KEY);
    const configs = LocalConfigs
        ? Object.assign({}, CONFIGS, JSON.parse(LocalConfigs))
        : CONFIGS;
    if (configs.theme) {
        document.body.classList.add(configs.theme);
    }
    return configs;
}

export const DEFAULT_CONFIGS = initConfigs();
