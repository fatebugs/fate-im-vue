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

//获取好友列表
export function getFriendsByGroups() {
    return request({
        url: imService + '/userFriend/getFriendsByGroups',
        method: 'get',
    })
}

//获取好友分组
export function getFriendGroups() {
    return request({
        url: imService + '/userFriend/findFriendGroup',
        method: 'get',
    })
}
//新建好友分组
export function createFriendGroup(query) {
    return request({
        url: imService + '/userFriend/createFriendGroup',
        method: 'post',
        data: query
    })
}

//搜索好友
export function searchFriend(query) {
    return request({
        url: imService + '/userFriend/searchFriend',
        method: 'get',
        params: query
    })
}

//发送好友申请
export function launchFriendApply(query) {
    return request({
        url: imService + '/userFriend/launchFriendApply',
        method: 'post',
        data: query
    })
}

