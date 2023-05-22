// 引入封装好的 request.js
import request from '@/api/request.js'
import {userService} from "@/api/apiConfig.js";

export function login(query) {
    return request({
        url: '/user-service/user/login',
        method: 'post',
        data: query,
    })
}
export function register(query) {
    return request({
        url: userService+'/user/register',
        method: 'post',
        data: query,
    })
}
//校验注册参数
export function registerCheck(query) {
    return request({
        url: userService+'/user/registerCheck',
        method: 'post',
        data: query,
    })
}
//退出登录
export function logout() {
    return request({
        url: userService+'/user/logOut',
        method: 'get',
    })
}
