import request from "../config/request_photo";


export function Upload() {
    return request({
        url: '/page/11',
        method: 'get',
    })
}