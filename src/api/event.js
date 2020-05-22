import request from '@/utils/request'

/**
 * 督办事件
 * @param {*} data 
 */
export function getEventSuperviseNum(data) {
  return request({
    url: '/api/eventSupervise',
    method: 'post',
    data
  })
}

/**
 * 事件详情
 * @param {*} data 
 */
export function detail(data) {
  return request({
    url: 'api/event/detail',
    method: 'GET',
    params:data
  })
}

/**
 * 事件督办
 * @param {*} data 
 */
export function supervise(data) {
  return request({
    url: 'api/event/supervise',
    method: 'post',
    data
  })
}

/**
 * 修改事件状态|添加备注
 * @param {*} data 
 */
export function updateStatus(data) {
  return request({
    url: '/api/event/updateStatus',
    method: 'post',
    data
  })
}