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
//获取用户聊天列表
export function getUserChatList() {
    return request({
        url: '/im-service/userChat/getChatList',
        method: 'get',
    })
}
//获取用户聊天记录
export function getMsgByChatId(query) {
    return request({
        url: '/im-service/userChat/getChatRecord',
        method: 'get',
        params: query,
    })
}
//获取用户群组列表
export function getUserGroupList() {
    return request({
        url: imService+'/userChatGroup/getGroupList',
        method: 'get',
    })
}
//获取群组所属的频道
export function getChannelByGroupId(query) {
    return request({
        url: imService+'/userChatChannel/getGroupChannelList',
        method: 'get',
        params: query,
    })
}
//获取频道的消息
export function getChannelMsg(query) {
    return request({
        url: imService+'/userChatChannel/getChannelMsg',
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
//发送群组消息
export function sendGroupMsg(query) {
    return request({
        url: imService+'/im/sendGroupMsg',
        method: 'post',
        data: query,
    })
}

//发起好友消息
export function launchFriendChat(query) {
    return request({
        url: imService+'/userChat/launchFriendChat',
        method: 'get',
        params: query,
    })
}

//搜索群聊
export function searchGroup(query) {
    return request({
        url: imService+'/userChatGroup/searchGroup',
        method: 'get',
        params: query,
    })
}
//加入群聊
export function joinGroup(query) {
    return request({
        url: imService+'/userChatGroup/joinGroup',
        method: 'get',
        params: query,
    })
}
//创建群聊
export function createGroup(query) {
    return request({
        url: imService+'/userChatGroup/createGroup',
        method: 'post',
        data: query,
    })
}
//创建频道
export function createChannel(query) {
    return request({
        url: imService+'/userChatChannel/createChannel',
        method: 'post',
        data: query,
    })
}
