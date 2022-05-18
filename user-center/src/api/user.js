import { request } from "@/utils/request";

/**
 * 登陆
 * @param {*} data
 * @returns
 */
export function UserLogin(data) {
    return request({
        url: `login`,
        method: "post",
        data,
    });
}

/**
 * 注册
 * @param {*} data
 * @returns
 */
 export function UserRegister(data) {
    return request({
        url: `register`,
        method: "post",
        data,
    });
}

/**
 * 验证用户登录状态
 * @param {*} data
 * @returns
 */
 export function CheckStatus() {
    return request({
        url: `checkstatus`,
        method: "get",
    });
}

/**
 * 验证邮箱是否已经注册
 * @param {*} data
 * @returns
 */
 export function VerifyEmailExist(data) {
    return request({
        url: `email/exist`,
        method: "post",
        data,
    });
}

/**
 * 发送验证码
 * @param {*} data
 * @returns
 */
 export function EmailCodeSend(data) {
    return request({
        url: `email/send`,
        method: "post",
        data,
    });
}

/**
 * 注销
 * @returns
 */
// export function UserLogout() {
//     return request({
//         url: `logout`,
//         method: "post",
//     });
// }



