import request from "../config/request_photo";

export function Upload(file) {
    return request({
        url: '/mongodb/1/upload',
        method: 'post',
        data: file
    })
}

export function UserImages(file) {
    return request({
        url: '/mongodb/1/images',
        method: 'get'
    })
}