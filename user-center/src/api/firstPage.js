import { request } from "@/utils/request";

/**
 * 获取第一页的信息
 * @param {*} data
 * @returns
 */
export function GetInfo1(data) {
    return request({
        url: `/getinfo/1`,
        method: "post",
        data,
    });
}

/**
 * 更新第一页的信息
 * @param {*} data
 * @returns
 */
 export function UpdateInfo1(data) {
    return request({
        url: `/updateinfo/1`,
        method: "post",
        data,
    });
}

/**
 * 创建第一页的信息
 * @param {*} data
 * @returns
 */
 export function CreateInfo1(data) {
    return request({
        url: `/createinfo/1`,
        method: "post",
        data,
    });
}




