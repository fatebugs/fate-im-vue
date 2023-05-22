// 引入封装好的 request.js
import request from '@/api/request.js'
import {imService} from "@/api/apiConfig.js";

export function getList(query) {
    return request({
        url: '/list',
        method: 'get',
        params: query,
    })
}
export function getUserChatList() {
    return request({
        url: '/im-service/userChat/getChatList',
        method: 'get',
    })
}
export function getMsgByChatId(query) {
    return request({
        url: '/im-service/userChat/getChatRecord',
        method: 'get',
        params: query,
    })
}
//发送消息
export function sendUserMsg(query) {
    return request({
        url: imService+'/im/sendMsg',
        method: 'post',
        data: query,
    })
}
