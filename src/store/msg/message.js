import {Msg} from "@/model/Msg.js";
import {Message} from "@/model/IMResponse.js";
import {getUserChatList} from "@/api/home/home.js";
import {createWebSocket} from "@/utils/socketUtil/socket-plugin.js";
import {UserChat} from "@/model/UserChat.js";
import dayjs from "dayjs";

//消息中心
export default {
    namespaced: true,
    state: {
        //用户消息列表
        userMsgList: [{}],
        //群组列表
        groupList: [{}],
        //频道列表
        channelList: [{}],
        //用户消息池
        userMsgPool: [{}],
        //群组消息池
        groupMsgPool: [{}],
        //用户聊天消息临时存储
        userChatMsg: [{}],
        //群组聊天消息临时存储
        groupChatMsg: [{}],

        linkFlag: false,//websocket是否连接
    },
    actions: {
        iniWebSocket(context) {
            if (context.state.linkFlag) {
                return;
            }
            //创建全局websocket连接，判断是否已经存在连接，存在则不创建
            createWebSocket((data) => {
                    context.dispatch('messageCallback', data)
                }
            )
            context.state.linkFlag = true;
            context.dispatch('getUserMsgList')
        },
        messageCallback(context, data) {
            let imResponse = new Message(data);
            let msg = new Msg(imResponse);
            console.log("消息中心收到消息", msg)
            if (msg.fromType === 'user') {
                context.commit("addUserMsgPool", msg);
                //判断当前会话id是否和当前聊天的id相同，如果相同则将消息添加到聊天消息列表中
                if (context.state.userChatMsg.length>0&&msg.sessionId === context.state.userChatMsg[0].sessionId) {
                    context.state.userChatMsg.push(msg);
                }
            }else {
                context.commit("addGroupMsgPool", msg);
            }



        },
        async getUserMsgList(context) {
            //获取用户消息列表
            await getUserChatList().then(res => {
                if (res.data) {
                    let tmpList = [];
                    res.data.data.forEach(item => {
                        let userChat = new UserChat(item);
                        userChat.lastMessageTime = dayjs(userChat.lastMessageTime).format("YYYY-MM-DD HH:mm:ss");
                        tmpList.push(userChat);
                    })
                    //将用户消息列表按时间排序
                    tmpList.sort((a, b) => {
                        return dayjs(b.lastMessageTime).valueOf() - dayjs(a.lastMessageTime).valueOf();
                    })
                    console.log("用户消息列表", tmpList)
                    context.state.userMsgList = tmpList;
                    console.log("用户消息列表", context.state.userMsgList)
                }
            })
        },
        checkUserChat(context,chat){
            console.log("检查用户聊天消息",chat)
            //过滤池中的消息
            let tmpList = context.state.userMsgPool.filter(item => {
                return item.sessionId === chat.id ;
            })
            console.log("过滤后的消息",tmpList)
            //将过滤后的消息添加到聊天消息列表中
            context.state.userChatMsg = tmpList;
        },
        sendMessage(context, msg){
            console.log("发送消息",msg)
        }


    },//可以发送异步请求（dispatch）
    mutations: {
        addUserMsgPool(state, msg) {
            state.userMsgPool.push(msg);
        },
        addGroupMsgPool(state, msg) {
            state.groupMsgPool.push(msg);
        },

        //修改连接状态
        changeLinkFlag(state, flag) {
            state.linkFlag = flag;
        },


    },//设置state中的数据（set）
    getters: {
        //state的计算数据 实现数据过滤的作用（get）
        getUserMsgList(state) {
            return state.userMsgList;
        },
        getGroupList(state) {
            return state.groupList;
        },
        getChannelList(state) {
            return state.channelList;
        },
        getMessageUserList(state) {
            return state.messageUserList;
        },
        getMessageGroupList(state) {
            return state.messageGroupList;
        },
        getLinkFlag(state) {
            return state.linkFlag;
        },
    },//state的计算数据 实现数据过滤的作用（get）

}
