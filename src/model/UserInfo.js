export class UserInfo{
    userUuid;//用户id
    userName;//用户名
    userEmail;//用户邮箱
    userPhoneNumber;//用户手机号
    userInfoNickname;//用户昵称
    userInfoAvatar;//用户头像地址
    userInfoGender=1;//用户性别
    userInfoBirthday;//用户生日
    userInfoSignature;//用户个性签名

    constructor(data) {
        this.userUuid = data?.userUuid;
        this.userName = data?.userName;
        this.userEmail = data?.userEmail;
        this.userPhoneNumber = data?.userPhoneNumber;
        this.userInfoNickname = data?.userInfoNickname;
        this.userInfoAvatar = data?.userInfoAvatar;
        this.userInfoGender = data?.userInfoGender;
        this.userInfoBirthday = data?.userInfoBirthday;
        this.userInfoSignature = data?.userInfoSignature;
    }
}
