import request from '../config/request';


export function GetPage() {
  return request({
    url: '/page/11',
    method: 'get',
  })
}

export function getProduct() {
  return request({
    url: '/product/findAll',
    method: 'get'
  })
}