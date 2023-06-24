const url = "ws://192.168.70.110:8080";
const socket = new WebSocket(url);
let statusArr = ['正在连接', '已建立连接', '正在关闭连接', '已关闭连接',]
const task_queue = [];//处理主动请求后的返回的回调队列
const actions = {//处理服务器主动发送的数据的方法列表

}

socket.onopen = () => {
    console.log('与服务器连接成功');
    //持续接收后端消息
    //接收到消息
    socket.onmessage = (jsonString) => {
        const msg = JSON.parse(jsonString.data);
        console.log('接收内容：');
        console.log(msg);
        if (msg.type === "csc") {//向服务器请求后的返回
            task_queue.shift()(msg);
        } else { // 服务器主动发送的数据
            actions[msg["action"]](msg);
        }
    }
}

socket.onclose = () => {
    console.log('与服务器连接断开或失败');
}

//发送请求
export function Send(msg, callback) {
    if (socket.readyState === 1) {
        console.log('发送内容：');
        console.log(msg);
        socket.send(JSON.stringify(msg));
        task_queue.push(callback);
    }
}

//连接后运行
export function afterOpen(callback) {
    (async () => {
        let time = 0;
        while (socket.readyState !== socket.OPEN && time < 3000) {
            await new Promise(resolve => setTimeout(resolve(), 1));
            time++;
        }

        callback();
    })();
}