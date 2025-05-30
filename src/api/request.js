/****   request.js   ****/
// 导入axios
import axios from 'axios'
// 使用element-ui Message做消息提醒
import {ElMessage} from 'element-plus';

import {APIUrl} from "@/api/apiConfig.js";

import { MessagePlugin } from 'tdesign-vue-next';
import store from "@/store/index.js";
import {TokenInfo} from "@/model/TokenInfo.js";

const urlConfig = {
    baseUrl: APIUrl
}

//1. 创建新的axios实例，
const service = axios.create({
    // 公共接口
    baseURL: urlConfig.baseUrl,
    // 超时时间 单位是ms，这里设置了10s的超时时间
    timeout: 20 * 1000
})
// 2.请求拦截器
service.interceptors.request.use(config => {
    //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
    config.headers = {
        'Content-Type': 'application/json;charset=utf-8', //配置请求头
    }
    //注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
    const token = localStorage.getItem('session_token');//这里取token之前，你肯定需要先拿到token,存一下
    if (token) {
        config.headers.session_token = token; //如果要求携带在请求头中
    }
    return config
}, error => {
    Promise.reject(error)
})

// 3.响应拦截器
service.interceptors.response.use(response => {
    //接收到响应数据并成功后的一些共有的处理，关闭loading等
    const res = response.data;
    if (res.code === 200) {
        return response
    } else if (res.code === 1008) {
        MessagePlugin.error(res.msg)
        localStorage.removeItem('session_token')
        store.commit('userAbout/setTokenInfo',new TokenInfo())
        return null
    } else {
        MessagePlugin.error(res.msg)
        // return Promise.reject(response)
        return response
    }
}, error => {
    /***** 接收到异常响应的处理开始 *****/
    if (error && error.response) {
        // 1.公共错误处理
        // 2.根据响应码具体处理
        switch (error.response.status) {
            case 400:
                error.message = '错误请求'
                break;
            case 401:
                error.message = '未授权，请重新登录'
                break;
            case 403:
                error.message = '拒绝访问'
                break;
            case 404:
                error.message = '请求错误,未找到该资源'
                // window.location.href = "/NotFound"
                break;
            case 405:
                error.message = '请求方法未允许'
                break;
            case 408:
                error.message = '请求超时'
                break;
            case 500:
                error.message = '服务器端出错'
                break;
            case 501:
                error.message = '网络未实现'
                break;
            case 502:
                error.message = '网络错误'
                break;
            case 503:
                error.message = '服务不可用'
                break;
            case 504:
                error.message = '网络超时'
                break;
            case 505:
                error.message = 'http版本不支持该请求'
                break;
            default:
                error.message = `连接错误${error.response.status}`
        }
    } else {
        // 超时处理
        if (JSON.stringify(error).includes('timeout')) {
            MessagePlugin.error('服务器响应超时，请刷新当前页')
        }
        error.message = '连接服务器失败'
    }

    MessagePlugin.error(error.message)
    /***** 处理结束 *****/
    //如果不需要错误处理，以上的处理过程都可省略
    // Promise.resolve(error.response)
    return null
})
//4.导出axios实例
export default service
