import request from '@/utils/request'
//用户登录
export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

//获取用户名
export function getInfo() {
  return request({
    url: '/api/username',
    method: 'get',
    params: {}
  })
}

//获取用户权限
export function getPermission(token) {
  return request({
    url: '/api/permission',
    method: 'post',
    params: {token}
  })
}

export function logout() {
  return request({
    url: '/api/logout',
    method: 'get',
    params: {}
  })
}
