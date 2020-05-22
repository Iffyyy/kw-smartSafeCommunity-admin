import request from '@/utils/request'

/**
 * 获取权限可选展示
 * @param {*} params
 */
export function getPermissions() {
  return request({
    url: '/api/getPermissions',
    method: 'get',
  })
}

/**
 * 添加角色
 * @param {*} params
 */
export function addRole(params) {
  return request({
    url: '/api/addRole',
    method: 'post',
    params
  })
}

/**
 * 获取所有角色信息
 * @param {*} params
 */
export function systemGetRoles(params) {
  return request({
    url: '/api/systemGetRoles',
    method: 'get',
    params
  })
}

/**
 * 编辑角色
 * @param {*} params
 */
export function compileRole(params) {
  return request({
    url: '/api/compileRole',
    method: 'post',
    params
  })
}

/**
 * 角色名称+权限信息
 * @param {*} params
 */
export function searchRole(params) {
  return request({
    url: '/api/searchRole',
    method: 'get',
    params
  })
}

/**
 * 删除角色
 * @param {*} params
 */
export function deleteRole(params) {
  return request({
    url: '/api/deleteRole',
    method: 'post',
    data:params
  })
}

