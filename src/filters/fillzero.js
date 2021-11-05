export const fillzero = n => n < 10 ? '0' + n : '' + n;



export const fillFixed2 = n => {
    if (n != n) return 0
    if (parseInt(n) == n) return n;
    return n = n.toFixed(2)
}
export const fillFixed = n => {
    if (n != n) return 0
    return n = Math.floor(n)
}