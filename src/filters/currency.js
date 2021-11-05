export const minus2head = n => {
    let i = n.indexOf('-')
    let j = n.indexOf('+')

    if (i != -1) {
        return `-${n.substring(0,i)}${n.substring(i+1)}`
    } else if (j != -1) {
        return `+${n.substring(0,i)}${n.substring(i+1)}`
    } else {
        return n
    }
}