import request from '@/utils/request'

/**
 * 社区信息
 * @param {*} params
 */
export function commumityInfo(params) {
  return request({
    url: '/api/commumityInfo',
    method: 'get',
    params
  })
}

/**
 * 所有事件趋势
 * @param {*} params
 */
export function getEventAnalyze(params) {
  return request({
    url: '/api/getEventAnalyze',
    method: 'post',
    params
  })
}

/**
 * 事件细分七天排比
 * @param {*} params
 */
export function getEventListAnalyze(params) {
  return request({
    url: '/api/getEventListAnalyze',
    method: 'post',
    params
  })
}
