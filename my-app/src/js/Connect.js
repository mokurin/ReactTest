const url = "ws://localhost:9998";
const socket = new WebSocket(url);
const task_queue = [];
const actions = {

}

window.onload = () => {
    if (socket.readyState === 1)
        //接收到消息
        socket.onmessage = (jsonString) => {
            const msg = JSON.parse(jsonString);
            if (msg["type"] === "csc") {
                task_queue.pop(msg);
            } else { // 服务器主动发送的数据
                actions[msg["action"]](msg);
            }
        }
}

export function Send(msg, callback) {
    socket.send(JSON.stringify(msg));
    task_queue.push(callback);
}