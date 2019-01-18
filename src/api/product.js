import request from "../config/request"

export function GetGoods() {
  return request({
    url: '/goods/1',
    method: 'get'
  })
}