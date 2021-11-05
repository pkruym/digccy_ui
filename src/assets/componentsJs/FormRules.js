var QQV = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('输入QQ号'))
    } else if (/^[1-9][0-9]{4,10}$/.test(value)) {
        callback()
    } else {
        callback(new Error('输入正确的QQ号'))
    }
}

// 类似金钱,首位不为0,最多2位小数
export function checkNumPot2(rule, value, callback) {
    const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
    if (!value) {
        return callback(new Error('请填写数字'))
    } else if (!reg.test(value)) {
        return callback(new Error('请填写数字,最多2位小数'))
    } else {
        callback()
    }
}
// 类似金钱,首位不为0,最多2位小数
export function checkNumPotLimit(rule, value, callback) {
    const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
    if (!value) {
        return callback(new Error('请填写数字'))
    } else if (!reg.test(value)) {
        return callback(new Error('请填写数字,最多2位小数'))
    } else if (value > 50000) {
        callback(new Error('*单笔提现金额不超过49999元'))
    } else if (value < 10) {
        callback(new Error('*请输入正确的金额，金额不能低于10元'))
    } else {
        callback()
    }
}

// 身份证
export function checkIdNum(rule, value, callback) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (!value) {
        return callback(new Error('证件号码不能为空'))
    } else if (!reg.test(value)) {
        return callback(new Error('证件号码不正确'))
    } else {
        callback()
    }
}
// 1到10
export function ValidateNumber(val) {
    const reg = /^\d{1,10}$/
    if (!reg.test(val)) return false;
    return true
}
// 手机号
export function phoneCheck(rule, value, callback) {
    if (!value) {
        return callback(new Error('手机号不能为空'))
    } else if (value.length != 11) {
        return callback(new Error('手机号必须为11位'))
    } else {
        callback()
    }
}
// 密码
export function password(rule, value, callback) {
    // const reg = /^[\w_-]{6,12}$/;
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/; //密码必须6—12位数字字母组合
    if (!value) {
        return callback(new Error('密码不能为空'))
    } else if (value.length < 6) {
        return callback(new Error('密码长度不能小于6'))
    } else if (value.length > 12) {
        return callback(new Error('密码长度不能大于12'))
    } else {
        if (!reg.test(value)) {
            return callback(new Error('数字与字母结合，不小于6位'))
        } else {
            callback()
        }
    }
}
export function passwordForLogin(rule, value, callback) {
    if (!value) {
        return callback(new Error('密码不能为空'))
    } else if (value.length < 6) {
        return callback(new Error('密码长度不能小于6'))
    } else {
        callback()
    }
}

// 整数
export function checkInterNum(rule, value, callback) {
    const reg = /^[0-9]*[1-9][0-9]*$/
    if (!value) {
        return callback(new Error('请填写整数'))
    } else if (!reg.test(value)) {
        return callback(new Error('请输入整数'))
    } else {
        callback()
    }
}
// 银行卡正则
export function card(rule, value, callback) {
    // const reg = /^([1-9]{1})(\d{14}|\d{18})$/
    const reg = /^(\d{16}|\d{19})$/
    if (!value) {
        return callback(new Error('银行卡不能为空'))
    } else if (!reg.test(value)) {
        return callback(new Error('请输入正确的银行卡号'))
    } else {
        callback()
    }
}
// 6位数字
export function sixNum(rule, value, callback) {
    const reg = /^\d{6}\b/
    if (!value) {
        return callback(new Error('密码不能为空'))
    } else if (!reg.test(value)) {
        return callback(new Error('请输入6位数字'))
    } else {
        callback()
    }
}
// 6位数字验证码
export function forNumCode(rule, value, callback) {
    const reg = /^\d{6}\b/
    if (!value) {
        return callback(new Error('验证码不能为空'))
    } else if (!reg.test(value)) {
        return callback(new Error('请输入6位数字'))
    } else {
        callback()
    }
}
// 6位数字,新密码
export function newSixNum(rule, value, callback) {
    const reg = /^\d{6}\b/
    if (!value) {
        return callback(new Error('新密码不能为空'))
    } else if (!reg.test(value)) {
        return callback(new Error('新密码有误，请重新输入'))
    } else {
        callback()
    }
}

// 取数字
export let num = val => {
    if (!val) return null;
    return val.replace(/[^0-9]/ig, "");
}

//取字母
export let eng = val => {
        if (!val) return null;
        return val.replace(/[^A-Z]/ig, '')
    }
    //取取汉字
export let chinese = val => {
    let reg = /[\u4e00-\u9fa5]{2,}/g
    if (!val) return null;
    return val.match(reg).join('')
}



export default {
    QQ: [{
        required: true,
        validator: QQV,
        trigger: 'blur'
    }],
    phone: [{
        required: true,
        // pattern: /^1[34578]\d{9}$/,
        // pattern: /^{11}$/,
        // message: '请输入正确的手机号码',
        validator: phoneCheck,
        trigger: 'change'
    }],
    numPot2: [{
        required: false,
        validator: checkNumPot2,
        trigger: 'change'
    }],
    numPotLimit: [{
        required: false,
        validator: checkNumPotLimit,
        trigger: 'change'
    }],
    password: [{
        required: true,
        validator: password,
        trigger: 'change'
    }],
    passwordForLogin: [{
        required: true,
        validator: passwordForLogin,
        trigger: 'change'
    }],
    checkIdNum: [{
        required: false,
        validator: checkIdNum,
        trigger: 'change'
    }],
    sixNum: [{
        required: false,
        validator: sixNum,
        trigger: 'change'
    }],
    forNumCode: [{
        required: false,
        validator: forNumCode,
        trigger: 'change'
    }],
    newSixNum: [{
        required: false,
        validator: newSixNum,
        trigger: 'change'
    }],
    card: [{
        required: false,
        validator: card,
        trigger: 'change'
    }],
    InterNum: [{
        required: true,
        validator: checkInterNum,
        trigger: 'change'
    }],
    email: [{
            required: true, //是否必填
            message: '请输入邮箱地址', //错误提示信息
            trigger: 'blur' //检验方式（blur为鼠标点击其他地方，）
        },
        {
            type: 'email', //要检验的类型（number，email，date等）
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
        }
    ],

}