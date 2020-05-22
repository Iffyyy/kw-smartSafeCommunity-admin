import request from '@/utils/request'

/**
 * 展示人员数据 （精确查询字段）
 * @param {*} params
 */

export function personSearch(params) {
  return request({
    url: '/api/personSearch',
    method: 'get',
    params
  })
}
