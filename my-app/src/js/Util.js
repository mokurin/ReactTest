//工具模块

//获取时间字符串
export function getTime(date) {
    if (date !== undefined) {
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + (date.getDate())).slice(-2);
        const year = date.getFullYear();
        const hour = ("0" + (date.getHours())).slice(-2);
        const min = ("0" + (date.getMinutes())).slice(-2);
        return year + "-" + month + "-" + day + " " + hour + ":" + min;
    }
}

//判断是否是老师
export function isTeacher(status) {
    if (status === "老师" || status === "0")
        return true;

    return false;
}

