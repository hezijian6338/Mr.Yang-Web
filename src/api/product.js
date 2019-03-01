import request from '../config/request'

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

export function AddTree(tree) {
  return request({
    url: '/tree/add',
    method: 'post',
    data: tree
  })
}

export function AddSkulist(skulist) {
  return request({
    url: '/skuList/add',
    method: 'post',
    data: skulist
  })
}

export function AddSku(sku) {
  return request({
    url: '/sku/add',
    method: 'post',
    data: sku
  })
}

export function AddGoods(goods) {
  return request({
    url: '/goods/add',
    method: 'post',
    data: goods
  })
}

export function AddProduct(product) {
  return request({
    url: '/product/add',
    method: 'post',
    data: product
  })
}

export function UpdateProduct(id, updateFieldMap) {
  return request({
    url: '/product/' + id,
    method: 'patch',
    data: updateFieldMap
  })
}

export function UpdateGoods(id, updateFieldMap) {
  return request({
    url: '/goods/' + id,
    method: 'patch',
    data: updateFieldMap
  })
}