//消息
import Message from "@/store/msg/message.js";

export class Msg{
    id;
    sessionId;//会话id
    content;//消息内容
    contentType;//消息类型
    msgTime;//消息时间
    userUuid;//用户uuid
    nickName;//用户昵称
    avatar;//用户头像

    /**
     *
     * @param data{Message}
     */
    constructor(data) {
        this.id = data.id;
        // this.sessionId = data.sessionId;
        this.content = data.content;
        this.contentType = data.contentType;
        this.msgTime = data.sendTime;
        this.userUuid = data.fromUser?.userUuid;
        this.nickName = data.fromUser?.nickName;
        this.avatar = data.fromUser?.avatar;
    }
}
