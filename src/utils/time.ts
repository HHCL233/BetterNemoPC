export function timeStamp2Date(timeStamp: number) {
    const date = new Date(timeStamp * 1000);

    const Y = date.getFullYear() + '-';
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    const D = date.getDate() + ' ';
    const h = date.getHours() + ':';
    const m = date.getMinutes() + ':';
    const s = date.getSeconds();

    return (Y + M + D + h + m + s);

}