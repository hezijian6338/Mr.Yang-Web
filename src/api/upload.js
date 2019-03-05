import request from '../config/request_photo';

export function Upload(id, file) {
  return request({
    url: '/mongodb/' + id + '/upload',
    method: 'post',
    data: file
  })
}

export function UserImages(id) {
  return request({
    url: '/mongodb/' + id + '/images',
    method: 'get'
  })
}