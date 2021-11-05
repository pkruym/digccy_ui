export let phoneHide = val => {
    if (!val) return '';
    val = val.toString();
    let n = val.substring(0, 3)
    let y = val.substring(7)
    return n + '****' + y
}