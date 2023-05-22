//消息
import Message from "@/store/msg/message.js";
import dayjs from "dayjs";

export class Msg{
    id;
    sessionId;//会话id
    content;//消息内容
    contentType;//消息类型
    msgTime;//消息时间
    userUuid;//用户uuid
    nickName;//用户昵称
    avatar;//用户头像
    fromType;//消息来源类型

    /**
     *
     * @param data{Message}
     */
    constructor(data) {
        this.id = data.id;
        this.sessionId = data.sessionId;
        this.content = data.content;
        this.contentType = data.contentType;
        this.msgTime = dayjs(data.sendTime).format('YYYY-MM-DD HH:mm:ss')
        this.userUuid = data.fromUser?.userUuid;
        this.nickName = data.fromUser?.nickName;
        this.avatar = data.fromUser?.avatar;
        this.fromType = data.fromType;
    }
}
