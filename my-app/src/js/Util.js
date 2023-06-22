//工具模块

//获取时间戳
export function getTime(date) {
    return Date.parse(date);
}

//将时间戳格式化
export function formatTimestamp(timestamp) {
    let date = new Date(timestamp);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;

    let result = year + "-" + month + "-" + day + " " + hour + ":" + minute;
    if (isNaN(year)) {
        return '';
    }
    return result;
}

//判断是否是老师
export function isTeacher(status) {
    if (status === "t" || status === "0")
        return true;

    return false;
}

