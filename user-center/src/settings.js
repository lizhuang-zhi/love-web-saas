export const LS_KEY = "RHO-SETTINGS";

export const APP_NAME = "大胆爱 网站";

export const APP_TITLE = "大胆爱";

export const ON_PERMISSION = true;

export const ROUTE_WHITE_NAME_LIST = ["/", "/login", "/404"];

export const ERROR_IMG = "https://tva1.sinaimg.cn/large/e6c9d24ely1h1wgkg59bgj20u023zjvr.jpg";

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
