import request from '../config/request'

export function GetCarts(user_id) {
  return request({
    url: '/user/' + user_id + '/carts',
    method: 'get'
  })
}

export function GetCart(id) {
  return request({
    url: '/cart/' + id,
    method: 'get'
  })
}

export function UpdateCart(id, skuList_id, updateMap) {
  return request({
    url: '/cart/' + id + '/skuList/' + skuList_id,
    method: 'patch',
    data: updateMap
  })
}

export function BuyByCart(id) {
  return request({
    url: '/cart/delete/' + id,
    method: 'get'
  })
}