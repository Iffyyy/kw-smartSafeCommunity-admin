import request from '@/utils/request'

/**
 * 籍贯比例
 * @param {*} params
 */
export function getProvinceAnalyze(params) {
  return request({
    url: '/api/getProvinceAnalyze',
    method: 'get',
    params
  })
}

/**
 * 人员近期出入统计
 * @param {*} params
 */
export function getPersonAccess() {
  return request({
    url: '/api/getPersonAccess',
    method: 'get',
  })
}

/**
 * 今日出入类型
 * @param {*} params
 */
export function getDayPersonAccess(params) {
  return request({
    url: '/api/getDayPersonAccess',
    method: 'get',
    params
  })
}

/**
 * 性别年龄比例
 * @param {*} params
 */
export function ageSection(params) {
  return request({
    url: '/api/ageSection',
    method: 'get',
    params
  })
}


/**
 * 热点楼栋排行
 * @param {*} params
 */
export function buildingRanking(params) {
  return request({
    url: '/api/buildingRanking',
    method: 'get',
    params
  })
}

/**
 * 人口趋势
 * @param {*} params
 */
export function personAction(params) {
  return request({
    url: '/api/personAction',
    method: 'get',
    params
  })
}

/**
 * 出入口人口趋势
 * @param {*} params
 */
export function personOriented(params) {
  return request({
    url: '/api/personOriented',
    method: 'get',
    params
  })
}

/**
 * 人口属性运行指标
 * @param {*} params
 */
export function personProperty(params) {
  return request({
    url: '/api/personProperty',
    method: 'get',
    params
  })
}



