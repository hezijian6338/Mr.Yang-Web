import request from "../config/request"
import data from "../data/data";

export function GetGoods(goods_id) {
  return request({
    url: '/goods/' + goods_id,
    method: 'get'
  })
}

export function AddCart(user_id, carts) {
  return request({
    url: '/user/' + user_id + '/carts',
    method: 'post',
    data: carts
  })
}