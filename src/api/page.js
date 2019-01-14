import request from "../config/request";


export function GetPage() {
    return request({
      url: '/page/11',
      method: 'get',
    })
  }

export function getProduct(id) {
    return request({
      url: '/product/' + id,
      method: 'get'
    })
  }