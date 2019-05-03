import request from '../config/request';


export function GetUserIndex() {
  return request({
    url: '/user/1',
    method: 'get',
  })
}

export function GetFavorite(data) {
  return request({
    url: '/user/1/favorites',
    method: 'post',
    params: {
      data
    }
  })
}

export function DelFavorite(id) {
  return request({
    url: '/User/DelFavorite',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function GetAddressList() {
  return request({
    url: '/address/findAll',
    method: 'get',
  })
}

export function GetAddressById(id) {
  return request({
    url: '/user/' + id + '/addresses',
    method: 'get'
  })
}

export function SaveAddress(id, address) {
  return request({
    url: '/user/' + id + '/addresses',
    method: 'post',
    data: address
  })
}
export function DelAddress(data) {
  return request({
    url: '/User/DelAddress',
    method: 'post',
    params: {
      data
    }
  })
}


export function GetCoupon(data) {
  return request({
    url: '/user/coupon',
    method: 'Post',
    params: {
      data
    }
  })
}

export function ExchangeCoupon(code) {
  return request({
    url: '/User/ExchangeCoupon',
    method: 'Post',
    params: {
      code: code
    }
  })
}