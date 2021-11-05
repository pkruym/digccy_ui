export const fillzero = n => n < 10 ? '0' + n : '' + n;



export const state = val => {
    if (val == 'Queuing') return '排队中';
    if (val == 'Canceled') return '委托取消';
    if (val == 'Failure') return '委托失败';
    if (val == 'PartSuccess') return '部分委托成功';
    if (val == 'Success') return '委托成功';
    if (val == 'Discarded') return '废弃';
}
export const fillFixed = n => {
    if (n != n) return 0
    return n = Math.floor(n)
}