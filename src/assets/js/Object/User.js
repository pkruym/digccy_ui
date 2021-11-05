/*
 {
    authority (string, optional): 身份 = ['CLIENT', 'BROKER', 'EMPLOYEE']stringEnum:"CLIENT", "BROKER", "EMPLOYEE",
    birthday (string, optional): 生日 ,
    blacklist (boolean, optional): 状态 ,
    brokerSymbol (string, optional): 直属代理商symbol ,
    fundPasswdBlank (boolean, optional): 支付密码是否为空 ,
    gmtCreate (string, optional): 注册时间 ,
    headImg (string, optional): 头像 ,
    id (integer, optional): 用户id ,
    idCard (string, optional): 身份证 ,
    ipLastLoginIp (string, optional): 最后一次登陆 ,
    lastLoginTime (string, optional): 最后一次登陆时间 ,
    location (string, optional): 地理位置 ,
    mobilephone (string, optional): 手机号码 ,
    name (string, optional): 姓名 ,
    nickname (string, optional): 昵称 ,
    openClose (integer, optional): 交易状态:1.正常2.禁止开仓3.禁止平仓4.都禁止 ,
    realAuth (boolean, optional): 实名认证 ,
    registerIp (string, optional): 注册Ip ,
    registerPlatform (string, optional): 注册终端 = ['PC', 'IOS', 'ANDROID', 'H5', 'WEB']stringEnum:"PC", "IOS", "ANDROID", "H5", "WEB",
    sex (integer, optional): 性别 ,
    socialAccount (string, optional): 社交账号 ,
    username (string, optional): 用户名
}
*/
export class User {
    authority = "" // (string, optional): 身份 = ['CLIENT', 'BROKER', 'EMPLOYEE']stringEnum:"CLIENT", "BROKER", "EMPLOYEE",
    birthday = "" // (string, optional): 生日 ,
    blacklist = "" // (boolean, optional): 状态 ,
    brokerSymbol = "" // (string, optional): 直属代理商symbol ,
    fundPasswdBlank = true // (boolean, optional): 支付密码是否为空 ,
    gmtCreate = "" // (string, optional): 注册时间 ,
    headImg = "" // (string, optional): 头像 ,
    id = "" // (integer, optional): 用户id ,
    idCard = "" // (string, optional): 身份证 ,
    ipLastLoginIp = "" // (string, optional): 最后一次登陆 ,
    lastLoginTime = "" // (string, optional): 最后一次登陆时间 ,
    location = "" // (string, optional): 地理位置 ,
    mobilephone = "" // (string, optional): 手机号码 ,
    name = "" // (string, optional): 姓名 ,
    nickname = "" // (string, optional): 昵称 ,
    openClose = "" // (integer, optional): 交易状态:1.正常2.禁止开仓3.禁止平仓4.都禁止 ,
    overnight=false
    realAuth = "" // (boolean, optional): 实名认证 ,
    registerIp = "" // (string, optional): 注册Ip ,
    registerPlatform = "" // (string, optional): 注册终端 = ['PC', 'IOS', 'ANDROID', 'H5', 'WEB']stringEnum:"PC", "IOS", "ANDROID", "H5", "WEB",
    sex = 1 // (integer, optional): 性别 ,
    socialAccount = "" // (string, optional): 社交账号 ,
    username = "" // (string, optional): 用户名
    brokerCode = ""
    advancedRealAuth=false//是否高级认证

    constructor() {}
    merge(node) {
        let keys = Object.keys(node)
        for (let i = 0; i < keys.length; i++) {
            if (this.hasOwnProperty(keys[i])) {
                if (this[keys[i]] != node[keys[i]]) {
                    this[keys[i]] = node[keys[i]]
                }
            }
        }
    }
}
