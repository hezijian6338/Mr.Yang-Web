import request from "../config/request"

export function GetCarts(user_id) {
  return request({
    url: '/user/' + user_id + '/carts',
    method: 'get'
  })
}