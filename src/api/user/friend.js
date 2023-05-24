// 引入封装好的 request.js
import request from '@/api/request.js'
import {imService} from "@/api/apiConfig.js";

//获取好友申请列表
export function getFriendApplyList() {
    return request({
        url: imService + '/userFriend/getFriendApplyList',
        method: 'get',
    })
}

//处理好友申请
export function handleFriendApply(query) {
    return request({
        url: imService + '/userFriend/handleFriendApply',
        method: 'post',
        data: query
    })
}
