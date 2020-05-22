import request from '@/utils/request'

//获取今日或往日待办事件
export function getEventInfo(params) {
  return request({
    url: '/api/getEventInfo',
    method: 'post',
    params
  })
}
//获取最新事件信息
export function getNewestEventInfo(params) {
  return request({
    url: '/api/getNewestEventInfo',
    method: 'post',
    params
  })
}
//获取事件类型对应的事件数量
export function eventTypeScale(params) {
  return request({
    url: '/api/eventTypeScale',
    method: 'post',
    params
  })
}
//督办事件数量
export function eventSupervise() {
  return request({
    url: '/api/eventSupervise',
    method: 'post',
  })
}

//获取最新事件信息
export function residentEventList() {
  return request({
    url: '/api/residentEventList',
    method: 'get',
  })
}

//今日待办事件类型
export function dayEventList(params) {
  return request({
    url: '/api/dayEventList',
    method: 'get',
    params
  })
}
