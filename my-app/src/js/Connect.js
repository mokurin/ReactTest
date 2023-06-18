const url = "ws://localhost:9998";
const socket = new WebSocket(url);
const task_queue = [];//处理主动请求后的返回的回调队列
const actions = {//处理服务器主动发送的数据的方法列表

}

window.onload = () => {
    if (socket.readyState === 1)
        //持续接收后端消息
        //接收到消息
        socket.onmessage = (jsonString) => {
            const msg = JSON.parse(jsonString);
            if (msg["type"] === "csc") {//向服务器请求后的返回
                task_queue.pop(msg);
            } else { // 服务器主动发送的数据
                actions[msg["action"]](msg);
            }
        }
}

//发送请求
export function Send(msg, callback) {
    socket.send(JSON.stringify(msg));
    task_queue.push(callback);
}