import {UserInfo} from "@/model/UserInfo.js";

export class TokenInfo {
    token;//用户登录后的token
    user;//登录用户信息
    userUuid;//用户id
    userName;//用户名
    loginTime;//登录时间
    expireTime;//过期时间
    ipaddr;//登录IP地址
    permissions=[];//权限列表
    roles=[];//角色列表

    constructor(data) {
        this.token = data.token;
        this.user = new UserInfo(data.user)
        this.userUuid = data.userUuid;
        this.userName = data.userName;
        this.loginTime = data.loginTime;
        this.expireTime = data.expireTime;
        this.ipaddr = data.ipaddr;
        this.permissions = data.permissions;
        this.roles = data.roles;
    }
}
