import request from '@/utils/request'

/**
 * 
 * @param {*} params 
 */
export function loadList(params) {
  return request({
    url: '/api/commonEvent',
    method: 'get',
    params
  })
}

export function loadEventList(params) {
  return request({
    url: '/api/commonEventList',
    method: 'get',
    params
  })
}
