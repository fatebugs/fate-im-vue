export class UserChat{
    id;
    friendName;
    friendAvatar;
    lastMessage;
    lastMessageTime;
    constructor(data) {
        this.id = data.id;
        this.friendName = data.friendName;
        this.friendAvatar = data.friendAvatar;
        this.lastMessage = data.lastMessage;
        this.lastMessageTime = data.lastMessageTime;
    }
}
