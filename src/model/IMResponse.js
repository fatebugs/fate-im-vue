//实体类
import {FromUser} from "@/model/FromUser.js";

/**
 * 消息实体类
 */
export class Message {
    /**
     * 消息id
     * @type {string}
     */
    id;
    /**
     * 消息来源
     * @type {string}
     */
    from;
    /**
     * 消息来源类型:::user：用户，group：群组
     * @type {string}
     */
    fromType;
    /**
     * 消息发送目标
     * @type {string}
     */
    to;
    /**
     * 信息内容
     * @type {string}
     */
    content;
    /**
     * 信息类型
     * @type {string}
     */
    contentType;
    /**
     * 发送时间
     * @type {Date}
     */
    sendTime;
    /**
     * 发送人信息
     * @type {FromUser}
     */
    fromUser=new FromUser();

    /**
     * 会话id
     * @type {string}
     */
    sessionId;

    constructor(data){
        this.id = data?.msgId;
        this.from = data?.from;
        this.fromType = data?.fromType;
        this.to = data?.to;
        this.content = data?.content;
        this.contentType = data?.contentType;
        this.sendTime = data?.sendTime;
        this.fromUser = data?.fromUser;
        this.sessionId = data?.sessionId;
    }
}
