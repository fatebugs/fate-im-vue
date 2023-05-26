import {Msg} from "@/model/Msg.js";
import {Message} from "@/model/IMResponse.js";
import {
    getChannelByGroupId,
    getChannelMsg,
    getMsgByChatId,
    getUserChatList,
    getUserGroupList,
    sendGroupMsg,
    sendUserMsg
} from "@/api/home/home.js";
import {closeWs, createWebSocket} from "@/utils/socketUtil/socket-plugin.js";
import {UserChat} from "@/model/UserChat.js";
import dayjs from "dayjs";
import {UserGroup} from "@/model/UserGroup.js";
import {GroupChannel} from "@/model/GroupChannel.js";
import {getFriendsByGroups} from "@/api/user/friend.js";

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

        //好友列表
        userFriendList: [{}],

        //好友id
        friendId: "",
        //当前会话id
        checkSessionId: "",
        //当前群聊id
        checkGroupId: "",
        //当前频道id
        checkChannelId: "",

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
            //修改websocket连接状态
            context.commit("changeLinkFlag", true);
        },
        messageCallback(context, data) {
            console.log("消息中心收到消息", data)
            if (data.code === 1008) {
                // context.state.linkFlag = false;
                // router.push({name: "Login"});
                localStorage.removeItem("session_token")
                return;
            }

            let imResponse = new Message(data);
            let msg = new Msg(imResponse);
            console.log("消息中心收到消息", msg)
            if (msg.fromType === 'user') {
                //这是一条用户消息
                context.commit("addUserMsgPool", msg);
                //判断当前会话id是否和当前聊天的id相同，如果相同则将消息添加到聊天消息列表中
                if (context.state.userChatMsg.length > 0 &&
                    msg.sessionId == context.state.checkSessionId
                ) {
                    context.state.userChatMsg.push(msg);
                }
                //重新拉取一下用户消息列表
                context.dispatch('getUserMsgList')

            } else {
                //这是一条群组消息
                context.commit("addGroupMsgPool", msg);
                //判断当前会话id是否和当前聊天的id相同，如果相同则将消息添加到聊天消息列表中
                if (context.state.groupChatMsg.length > 0 &&
                    msg.sessionId == context.state.checkChannelId
                ) {
                    context.state.groupChatMsg.push(msg);
                }
                //重新拉取一下频道消息列表
                context.dispatch('getChannelList', context.state.checkGroupId)

            }


        },
        //获取用户消息列表
        async getUserMsgList(context) {
            //获取用户消息列表
            await getUserChatList().then(res => {
                if (res && res.data) {
                    console.log("用户消息列表", res)
                    let tmpList = [];
                    res.data.data.forEach(item => {
                        let userChat = new UserChat(item);
                        userChat.lastMessageTime = userChat.lastMessageTime ? dayjs(userChat.lastMessageTime).format("YYYY-MM-DD HH:mm:ss") : "";
                        tmpList.push(userChat);
                    })
                    //将用户消息列表按时间排序
                    tmpList.sort((a, b) => {
                        const aTime = dayjs(a.lastMessageTime).valueOf();
                        const bTime = dayjs(b.lastMessageTime).valueOf();

                        if (aTime > bTime) {
                            return -1;
                        } else if (aTime < bTime) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    console.log("用户消息列表", tmpList)
                    //更新用户消息列表
                    context.commit("updateUserMsgList", tmpList);
                    console.log("用户消息列表", context.state.userMsgList)
                }
            })
        },
        //获取用户群组列表
        async getUserGroupList(context) {
            //获取用户群组列表
            await getUserGroupList().then(
                (res) => {
                    let result = res.data;
                    let data = result.data;
                    let tmpList = [];
                    data.forEach(item => {
                        let userGroup = new UserGroup(item);
                        tmpList.push(userGroup);
                    })
                    context.commit("updateGroupList", tmpList);
                }
            )
        },
        //选择用户聊天
        async checkUserChat(context, chat) {
            console.log("检查用户聊天消息", chat)
            let data = {
                chatId: chat.id,
            }
            //修改好友id
            context.commit("changeFriendId", chat.friendId);
            //修改当前会话id
            context.commit("changeSessionId", chat.id);

            //获取该会话id的消息
            await getMsgByChatId(data).then(res => {
                console.log("获取该会话id的消息", res)
                if (res && res.data) {
                    let tmpList = [];
                    res.data.data.forEach(item => {
                        let imResponse = new Message(item);
                        let msg = new Msg(imResponse);
                        //判断消息是否已经存在于消息池中
                        let tmp = context.state.userMsgPool.filter(item => {
                            return item.id === msg.id;
                        })
                        if (tmp.length === 0) {
                            tmpList.push(msg);
                        }
                    })
                    console.log("获取该会话id的消息", tmpList)
                    context.state.userMsgPool.push(...tmpList)
                    //过滤池中的消息
                    tmpList = context.state.userMsgPool.filter(item => {
                        return item.sessionId === chat.id;
                    })

                    console.log("过滤后的消息", tmpList)
                    //将过滤后的消息添加到聊天消息列表中
                    context.commit("updateUserChatMsg", tmpList);
                }
            })
        },
        //选择群组聊天
        async checkGroup(context, groupId) {
            //清除群组消息临时池
            context.commit("updateGroupChatMsg", []);
            //清除选择的频道id
            context.commit("changeChannelId", "");
            console.log("检查群组聊天消息", groupId)
            let data = {
                groupId: groupId,
            }
            //修改选择的群组id
            context.commit("changeGroupId", groupId);
            //获取群组所属的频道
            await getChannelByGroupId(data).then(res => {
                console.log("获取群组所属的频道", res)
                if (res && res.data) {
                    let tmpList = [];
                    res.data.data.forEach(item => {
                        let channel = new GroupChannel(item);
                        channel.lastMsgTime = channel.lastMsgTime ? dayjs(channel.lastMsgTime).format("YYYY-MM-DD HH:mm:ss") : "";
                        tmpList.push(channel);
                    })
                    context.commit("updateChannelList", tmpList);
                }
            })
        },
        //重新拉取频道列表
        async getChannelList(context,groupId) {
            let data = {
                groupId: groupId,
            }
            //修改选择的群组id
            context.commit("changeGroupId", groupId);
            //获取群组所属的频道
            await getChannelByGroupId(data).then(res => {
                console.log("获取群组所属的频道", res)
                if (res && res.data) {
                    let tmpList = [];
                    res.data.data.forEach(item => {
                        let channel = new GroupChannel(item);
                        channel.lastMsgTime = channel.lastMsgTime ? dayjs(channel.lastMsgTime).format("YYYY-MM-DD HH:mm:ss") : "";
                        tmpList.push(channel);
                    })
                    context.commit("updateChannelList", tmpList);
                }
            })
        },


        //选择频道聊天
        async checkChannelChat(context, channelId) {
            console.log(channelId)
            let data = {
                channelId: channelId,
            }
            //修改选择的频道id
            context.commit("changeChannelId", channelId);
            //获取频道聊天消息
            await getChannelMsg(data).then(res => {
                console.log("获取频道聊天消息", res)
                if (res && res.data) {
                    let tmpList = [];
                    res.data.data.forEach(item => {
                        let imResponse = new Message(item);
                        let msg = new Msg(imResponse);
                        //判断消息是否已经存在于消息池中
                        let tmp = context.state.groupMsgPool.filter(item => {
                            return item.id === msg.id;
                        })
                        if (tmp.length === 0) {
                            tmpList.push(msg);
                        }
                    })

                    console.log("获取频道聊天消息", tmpList)
                    context.state.groupMsgPool.push(...tmpList)
                    //过滤池中的消息
                    tmpList = context.state.groupMsgPool.filter(item => {
                        return item.sessionId === channelId;
                    })

                    console.log("过滤后的消息", tmpList)
                    //将过滤后的消息添加到聊天消息列表中
                    context.commit("updateGroupChatMsg", tmpList);
                }
            })
        },
        //发送消息
        sendMessage(context, msg) {

            //组装消息体
            let imResponse = {
                to: context.state.friendId,
                contentType: msg.contentType ? msg.contentType : '0',
                content: msg.content,
                device: 'web',
            }

            console.log("发送消息", imResponse)
            //发送消息
            sendUserMsg(imResponse).then(res => {
                    console.log("发送消息", res)
                }
            )
        },
        //发送群组消息
        sendGroupMessage(context, msg) {
            //组装消息体
            let imResponse = {
                to: context.state.checkChannelId,
                contentType: msg.contentType ? msg.contentType : '0',
                content: msg.content,
                device: 'web',
            }

            console.log("发送群组消息", imResponse)
            //发送消息
            sendGroupMsg(imResponse).then(res => {
                    console.log("发送群组消息", res)
                }
            )
        },
        getFriendList (context) {
            getFriendsByGroups().then(res => {
                context.commit("updateFriendList", res.data.data)
            })
        },


        //初始化所有的消息列表，将所有的对象都初始化为空
        async initAllMsgList(context) {
            let userMsgPool = [];
            let groupMsgPool = [];
            let userChatMsg = [];
            let groupChatMsg = [];
            let userMsgList = [];
            let groupList = [];
            let channelList = [];
            let linkFlag = false;
            let friendId = "";
            let checkSessionId = "";
            let checkGroupId = "";
            let checkChannelId = "";

            let data = {
                userMsgPool,
                groupMsgPool,
                userChatMsg,
                groupChatMsg,
                userMsgList,
                groupList,
                channelList,
                linkFlag,
                friendId,
                checkSessionId,
                checkGroupId,
                checkChannelId,
            }
            context.commit("updateAllMsgList", data);

        },
        //关闭websocket连接
        closeWebSocket(context) {
            closeWs();
            //修改连接状态
            context.commit("changeLinkFlag", false);
        },


    },//可以发送异步请求（dispatch）
    mutations: {
        addUserMsgPool(state, msg) {
            state.userMsgPool.push(msg);
        },
        addGroupMsgPool(state, msg) {
            state.groupMsgPool.push(msg);
        },
        addUserChatMsg(state, msg) {
            state.userChatMsg.push(msg);
        },
        updateUserChatMsg(state, msg) {
            state.userChatMsg = msg;
        },

        //修改群组聊天消息临时存储
        updateGroupChatMsg(state, msg) {
            state.groupChatMsg = msg;
        },
        //修改好友id
        changeFriendId(state, id) {
            state.friendId = id;
        },
        //修改会话id
        changeSessionId(state, id) {
            state.checkSessionId = id;
        },
        //修改群组id
        changeGroupId(state, id) {
            state.checkGroupId = id;
        },
        //修改频道id
        changeChannelId(state, id) {
            state.checkChannelId = id;
        },

        //更新用户消息列表
        updateUserMsgList(state, list) {
            state.userMsgList = list;
        },
        //更新群组列表
        updateGroupList(state, list) {
            state.groupList = list;
        },
        //更新频道列表
        updateChannelList(state, list) {
            state.channelList = list;
        },

        //修改连接状态
        changeLinkFlag(state, flag) {
            state.linkFlag = flag;
        },
        updateAllMsgList(state, payload) {
            state.userMsgPool = payload.userMsgPool;
            state.groupMsgPool = payload.groupMsgPool;
            state.userChatMsg = payload.userChatMsg;
            state.groupChatMsg = payload.groupChatMsg;
            state.userMsgList = payload.userMsgList;
            state.groupList = payload.groupList;
            state.channelList = payload.channelList;
            state.linkFlag = payload.linkFlag;
            state.friendId = payload.friendId;
            state.checkSessionId = payload.checkSessionId;
            state.checkGroupId = payload.checkGroupId;
            state.checkChannelId = payload.checkChannelId;
        },
        //修改好友列表
        updateFriendList(state, list) {
            state.userFriendList = list;
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
