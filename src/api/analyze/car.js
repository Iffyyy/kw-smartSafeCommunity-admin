import request from '@/utils/request'

/**
 * 车流趋势 - 当天
 * @param {*} params 
 */
export function trafficTrendsDay(params) {
  return request({
    url: '/api/trafficTrendsDay',
    method: 'get',
    params
  })
}

/**
 * 车流趋势 - 当周
 * @param {*} params 
 */
export function trafficTrendsWeek(params) {
  return request({
    url: '/api/trafficTrendsWeek',
    method: 'get',
    params
  })
}

/**
 * 车流趋势 - 当月
 * @param {*} params 
 */
export function trafficTrendsMonth(params) {
  return request({
    url: '/api/trafficTrendsMonth',
    method: 'get',
    params
  })
}

/**
 * 车辆近期出入统计
 * @param {*} params 
 */
export function statisticsCarAccess(params) {
  return request({
    url: '/api/statisticsCarAccess',
    method: 'get',
    params
  })
}


/**
 * 入口车流占比
 * @param {*} params 
 */
export function trafficEntryScale(params) {
  return request({
    url: '/api/trafficEntryScale',
    method: 'get',
    params
  })
}

/**
 * 车位空置率
 * @param {*} params 
 */
export function placeVacancyRate(params) {
  return request({
    url: '/api/placeVacancyRate',
    method: 'get',
    params
  })
}


