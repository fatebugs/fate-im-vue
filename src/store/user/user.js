import {TokenInfo} from "@/model/TokenInfo.js";

//消息中心
export default {
    namespaced: true,
    state: {
        tokenInfo: {},
        rlFlag:true
    },
    actions: {},//可以发送异步请求（dispatch）
    mutations: {
        setTokenInfo(state, tokenInfo) {
            state.tokenInfo = new TokenInfo(tokenInfo);
        },
        setRlFlag(state,rlFlag){
            state.rlFlag = rlFlag;
        }
    },//设置state中的数据（set）
    getters: {},//state的计算数据 实现数据过滤的作用（get）

}
