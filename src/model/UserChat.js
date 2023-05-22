export class UserChat{
    id;
    friendName;
    friendId;
    friendAvatar;
    lastMessage;
    lastMessageTime;
    constructor(data) {
        this.id = data.id;
        this.friendName = data.friendName;
        this.friendId = data.friendId;
        this.friendAvatar = data.friendAvatar;
        this.lastMessage = data.lastMessage;
        this.lastMessageTime = data.lastMessageTime;
    }
}
