import request from '@/utils/request'

/**
 * 获取所有role
 * @param {*} params
 */
export function getRoles() {
  return request({
    url: '/api/getRoles',
    method: 'get',
  })
}

/**
 * 编辑账户
 * @param {*} params
 */
export function compileAccount(params) {
  return request({
    url: '/api/compileAccount',
    method: 'post',
    params
  })
}

/**
 * 添加账号
 * @param {*} params
 */
export function register(params) {
  return request({
    url: '/api/register',
    method: 'post',
    params
  })
}

/**
 * 获取所有账号信息
 * @param {*} params
 */
export function getAccounts(params) {
  return request({
    url: '/api/getAccounts',
    method: 'get',
    params
  })
}

/**
 * 编辑账号密码
 * @param {*} params
 */
export function changePassworde(params) {
  return request({
    url: '/api/changePassword',
    method: 'post',
    params
  })
}

/**
 * 账号名称
 * @param {*} params
 */
export function searchAccount(params) {
  return request({
    url: '/api/searchAccount',
    method: 'get',
    params
  })
}

/**
 * 删除账号
 * @param {*} params
 */
export function deleteUsers(params) {
  return request({
    url: '/api/deleteUsers',
    method: 'post',
    params
  })
}

/**
 * 重置密码
 * @param {*} params
 */
export function resetPassword(params) {
  return request({
    url: '/api/resetPassword',
    method: 'get',
    params
  })
}
/**
 * 账户状态 （启用/禁用）
 * @param {*} params
 */
export function cutStatus(params) {
  return request({
    url: '/api/cutStatus',
    method: 'get',
    params
  })
}
