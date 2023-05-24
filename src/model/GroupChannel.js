export class GroupChannel{
    channelId;
    channelName;
    channelAvatar;
    channelType;
    lastMsg;
    lastMsgTime;
    constructor(channelResp) {
        this.channelId = channelResp.channelId;
        this.channelName = channelResp.channelName;
        this.channelAvatar = channelResp.channelAvatar;
        this.channelType = channelResp.channelType;
        this.lastMsg = channelResp.lastMsg;
        this.lastMsgTime = channelResp.lastMsgTime;
    }
}
