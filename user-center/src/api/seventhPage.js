import { request } from "@/utils/request";

/**
 * 获取
 * @param {*} data
 * @returns
 */
export function GetInfo(data) {
    return request({
        url: `/getinfo/7`,
        method: "post",
        data,
    });
}

/**
 * 更新
 * @param {*} data
 * @returns
 */
 export function UpdateInfo(data) {
    return request({
        url: `/updateinfo/7`,
        method: "post",
        data,
    });
}

/**
 * 创建
 * @param {*} data
 * @returns
 */
 export function CreateInfo(data) {
    return request({
        url: `/createinfo/7`,
        method: "post",
        data,
    });
}




