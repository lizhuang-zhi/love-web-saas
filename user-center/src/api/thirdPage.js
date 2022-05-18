import { request } from "@/utils/request";

/**
 * 获取
 * @param {*} data
 * @returns
 */
export function GetInfo(data) {
    return request({
        url: `/getinfo/3`,
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
        url: `/updateinfo/3`,
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
        url: `/createinfo/3`,
        method: "post",
        data,
    });
}

/**
 * 删除文件
 * @param {*} data
 * @returns
 */
 export function DelFile(data) {
    return request({
        url: `/delfile/upload/3`,
        method: "post",
        data,
    });
}