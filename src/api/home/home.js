// 引入封装好的 request.js
import request from '@/api/request.js'

export function getList(query) {
    return request({
        url: '/list',
        method: 'get',
        params: query,
    })
}
