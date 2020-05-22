import request from "@/utils/request";

//报表中心人员基本信息
export function getFormPersonField(token) {
  return request({
    url: '/api/getFormPersonField',
    method: 'get',
    params: {token}
  })
}

//报表中心事件信息
export function getFormEventField(token) {
  return request({
    url: '/api/getFormEventField',
    method: 'get',
    params: {token}
  })
}

//获取楼栋
export function villageGetBuilding() {
  return request({
    url: '/api/villageGetBuilding',
    method: 'get',
  })
}

//获取单元
export function villageGetUnit(data) {
  console.log(data)
  return request({
    url: '/api/villageGetUnit',
    method: 'get',
    params: data
  })
}

//获取房屋
export function villageGetHouse(data) {
  return request({
    url: '/api/villageGetHouse',
    method: 'get',
    params: data
  })
}
