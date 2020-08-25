const _my = require("../__antmove/api/index.js")(my);
const baseURL = "https://share.100bm.cn/";
export function request(url, method, data = {}) {
    url = baseURL + url;
    return new Promise((resolve, reject) => {
        _my.request({
            url,
            data,
            method,

            success(response) {
                resolve(response.data);
            },

            fail(err) {
                reject(err);
            }
        });
    });
}
