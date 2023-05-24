export class UserGroup {
    groupId;
    groupName;
    ownerId;
    groupAvatar;
    announcement;

    constructor(data) {
        this.groupId = data.groupId;
        this.groupName = data.groupName;
        this.ownerId = data.ownerId;
        this.groupAvatar = data.groupAvatar;
        this.announcement = data.announcement;
    }
}
