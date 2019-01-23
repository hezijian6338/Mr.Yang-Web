import request from "../config/request"

export function GetGoods(goods_id) {
  return request({
    url: '/goods/' + goods_id,
    method: 'get'
  })
}