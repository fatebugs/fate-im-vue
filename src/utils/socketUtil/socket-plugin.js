import {socketUrl} from "@/api/apiConfig.js";
import {Message} from "@/model/IMResponse.js"
import router from "@/router/index.js";
import store from "@/store/index.js";



let ws = null; //建立的连接
let lockReconnect = false;//是否真正建立连接
let timeout = 15 * 1000;//30秒一次心跳
let timeoutObj = null;//心跳心跳倒计时
let serverTimeoutObj = null;//心跳倒计时
let timeoutnum = null;//断开 重连倒计时
let global_callback = null; //监听服务端消息
// uri: 长链接地址<br>// jwt: 前后端连接凭证， 按需添加<br>// callback: 服务端消息回调函数


//初始化websocket
export const createWebSocket = (callback) => {
    global_callback = callback
    ws = new WebSocket(socketUrl)
    ws.onopen = () => {
        lockReconnect = true
        //开启连接心跳
        start()
        ws.onmessage = onMessage
        ws.onerror = onError
        ws.onclose = onClose
        ws.onsend = onSend
        ws.send('session_token'+localStorage.getItem('session_token'))
    }
}

//发送消息
export const onSend = (message) => {
    console.log(`发送消息： ${message}`)
    ws.send(message)
}
//接受服务端消息
export const onMessage = (res) => {
    let msgData = res.data
    if (typeof msgData != 'object' && msgData !== 'Connect success') {
        const data = msgData.replace(/\ufeff/g, "");
        const message = JSON.parse(data);
        let imResponse = new Message(message);
        //心跳回调
        if (imResponse.fromType === 'HEARTBEAT') {
            // console.log('连接成功')
            //重置心跳
            reset()
            return
        }

        //服务端消息回调
        global_callback(message)

        //重置心跳
        reset()
    }
}
//连接失败
export const onError = () => {
    console.log('连接失败')
    ws.close()
    ws = null
    lockReconnect = false
    localStorage.removeItem("session_token")
}
//连接关闭
export const onClose = () => {
    console.log('连接关闭')
    closeWs()
    //修改连接状态
    store.commit('messageAbout/changeLinkFlag', false)
}
//断开关闭
export const closeWs = () => {
    if (lockReconnect) {
        ws.close()
        ws = null
        lockReconnect = false
    }
}
//重置心跳
export const reset = () => {
    //清除时间
    clearTimeout(timeoutObj);
    //清除时间
    clearTimeout(serverTimeoutObj);
    start(); //重启心跳
}
// 启动对象
export const start = () => {
    timeoutObj && clearTimeout(timeoutObj);
    serverTimeoutObj && clearTimeout(serverTimeoutObj);
    timeoutObj = setTimeout(() => {
        //这里发送一个心跳，后端收到后，返回一个心跳消息
        if (ws.readyState === 1) { //如果连接正常
            ws.send(JSON.stringify({"data": "ROOM_KEEP_CONNECTION"}));
        } else {  //否则重连
            reconnect()
        }
        serverTimeoutObj = setTimeout(() => {
            //超时关闭
            ws.close();
        }, timeout);
    }, timeout + 3000)
}
//重新连接
export const reconnect = () => {
    if (lockReconnect) {
        return;
    }
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    timeoutnum && clearTimeout(timeoutnum);
    timeoutnum = setTimeout(() => {
        createWebSocket();//新连接
        lockReconnect = false;
    }, 5000);
}

