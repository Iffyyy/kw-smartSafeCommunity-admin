import request from '@/utils/request'

/**
 * 日志列表
 * @param {*} data 
 */
export function getList(data) {
  return request({
    url: '/api/log/getList',
    method: 'get',
    params:data
  })
}

/**
 * 日志列表
 * @param {*} data 
 */
export function getType(data) {
  return request({
    url: '/api/log/getType',
    method: 'get',
    params:data
  })
}