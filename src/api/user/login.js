// 引入封装好的 request.js
import request from '@/api/request.js'

export function login(query) {
    return request({
        url: '/user-service/user/login',
        method: 'post',
        data: query,
    })
}
export function register(query) {
    return request({
        url: '/user-service/user/register',
        method: 'post',
        data: query,
    })
}
