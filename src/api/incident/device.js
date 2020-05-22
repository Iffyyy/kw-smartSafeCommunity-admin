import request from '@/utils/request'

/**
 * 获取事件统计信息
 * @param {*} params 
 */
export function loadList(params) {
  return request({
    url: '/api/deviceEvent',
    method: 'get',
    params
  })
}

/**
 * 获取事件列表
 * @param {*} params 
 */
export function loadEventList(params) {
  return request({
    url: '/api/deviceEventList',
    method: 'get',
    params
  })
}

/**
 * 获取设备统计信息
 * @param {*} params 
 */
export function loadDeviceCount(params) {
  return request({
    url: '/api/deviceCount',
    method: 'post',
    params
  })
}
