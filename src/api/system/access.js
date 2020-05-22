import request from '@/utils/request'

/**
 * 出入记录分页展示（可查询）
 * @param {*} data 
 */
export function getAccessRecord(data) {
  return request({
    url: '/api/getAccessRecord',
    method: 'post',
    data
  })
}