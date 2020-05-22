import request from '@/utils/request'

/**
 * 查询人员列表
 * @param {*} params
 */
export function personList(params) {
  return request({
    url: '/api/archives/personList',
    method: 'get',
    params
  })
}

/**
 * 人员基础信息
 * @param {*} params
 */
export function baseInfo(params) {
  return request({
    url: '/api/archives/baseInfo',
    method: 'get',
    params
  })
}

/**
 * 车辆信息
 * @param {*} params
 */
export function carInfo(params) {
  return request({
    url: '/api/archives/carInfo',
    method: 'get',
    params
  })
}

/**
 * 车辆出入记录
 * @param {*} params
 */
export function carAccessInfo(params) {
  return request({
    url: '/api/archives/carAccessInfo',
    method: 'get',
    params
  })
}


/**
 * 获取居民事件分类
 * @param {*} params
 */
export function eventList(params) {
  return request({
    url: '/api/archives/eventList',
    method: 'get',
    params
  })
}

/**
 * 事件信息
 * @param {*} params
 */
export function eventInfo(params) {
  return request({
    url: '/api/archives/eventInfo',
    method: 'get',
    params
  })
}

/**
 * 出入记录
 * @param {*} params
 */
export function accessInfo(params) {
  return request({
    url: '/api/archives/accessInfo',
    method: 'get',
    params
  })
}

/**
 * 房屋信息
 * @param {*} params
 */
export function houseInfo(params) {
  return request({
    url: '/api/archives/houseInfo',
    method: 'get',
    params
  })
}

/**
 * 活动规律统计
 * @param {*} params
 */
export function activityLaw(params) {
  return request({
    url: '/api/archives/activityLaw',
    method: 'get',
    params
  })
}

/**
 * 关系网络
 * @param {*} params
 */
export function netWorks(params) {
  return request({
    url: 'api/archives/netWorks',
    method: 'get',
    params
  })
}




