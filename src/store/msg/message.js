import {Msg} from "@/model/Msg.js";
import {Message} from "@/model/IMResponse.js";

//消息中心
export default {
    namespaced: true,
    state: {
        userMsgList: [],//用户消息列表
        groupList: [],//群组列表
        channelList: [],//频道列表
        messageUserList: [],//用户消息
        messageGroupList: [],//群组消息
    },
    actions: {
        messageCallback(context,data) {
            let imResponse = new Message(data);
            console.log("消息中心收到消息",imResponse)
            let msg = new Msg(imResponse);
            console.log("消息中心收到消息",msg)
            context.commit("addMessageList", msg);
        }
    },//可以发送异步请求（dispatch）
    mutations: {
        //设置state中的数据（set）
        addGroupList(state, group) {
            state.groupList.push(group);
        },
        addChannelList(state, channel) {
            state.channelList.push(channel);
        },
        addMessageList(state, msg) {
            state.messageUserList.push(msg);
        },
        addMessageGroupDetail(state, msg) {
            state.messageGroupDetail.push(msg);
        },

        addUserMsgList(state, userMsg) {
            state.userMsgList.push(userMsg);
        },

        //删除state中的数据（delete）


    },//设置state中的数据（set）
    getters: {

    },//state的计算数据 实现数据过滤的作用（get）

}
