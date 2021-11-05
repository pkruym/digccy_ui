import { SocketAPI } from "@/assets/js/WsApi2";

import { HttpUri } from "@/assets/js/config";

import { User } from "@/assets/js/Object/User";

const state = {
  isLogin: false,
  // token: "",
  imgData: {
    sessionId: "",
    data: null
  },
  user: new User(), //User
  userLucky: null,
  currentLucky: null, //当前选中红包
  currentHandLucky: null, //当前选中手续费抵扣券
  regulations: null
};

const getters = {
  isLogin: state => {
    return state.isLogin;
  },
  imageData: state => {
    return state.imgData.data;
  },
  imgSessionId: state => {
    return state.imgData.sessionId;
  },
  userInfo: state => {
    return state.user;
  },
  getregulations: state => {
    return state.regulations;
  },
  fundPasswdBlank: state => {
    return state.user.fundPasswdBlank;
  },
  mobilephone: state => {
    return state.user.mobilephone;
  },

  getOtcListUrl: (state, getters, rootState, rootGetters) => {
    let url =
      window.config.host +
      "/operate/#/charge/otcList?token=" +
      // HttpUri + "?token=" +
      SocketAPI.token +
      "&userid=" +
      state.user.id;
    return url;
  },
  getreversalUri: (state, getters, rootState, rootGetters) => {
    let url =
      window.config.host +
      "/operate/#/charge/coincharging?token=" +
      // HttpUri + "?token=" +
      SocketAPI.token +
      "&userid=" +
      state.user.id;
    return url;
  },
  getwithdrawalUri: (state, getters, rootState, rootGetters) => {
    let url =
      window.config.host +
      "/operate/#/charge/withdrawmoney?token=" +
      // HttpUri + "?token=" +
      SocketAPI.token +
      "&availableBalance=" +
      rootGetters["actual/account/personalMsgKey"][1].value +
      "&type=D";
    return url;
  },
  getenwithdrawalUri: (state, getters, rootState, rootGetters) => {
    let url =
      window.config.host +
      "/operate/#/enWithdrawmoney?token=" +
      // HttpUri + "?token=" +
      SocketAPI.token +
      "&availableBalance=" +
      rootGetters["actual/account/personalMsgKey"][1].value +
      "&type=D";
    return url;
  },
  getRechargeUri: (state, getters, rootState, rootGetters) => {
    let url =
      //  "http://40.83.114.97/operate/#/charge?token=" +
      HttpUri +
      "?token=" +
      SocketAPI.token +
      "&phone=" +
      state.user.mobilephone +
      "&availableBalance=" +
      rootGetters["actual/account/accountInfo"].balance +
      "&type=D";
    return url;
  },

  getNoticeUri: (state, getters, rootState, rootGetters) => {
    let HttpUriOnWrite = HttpUri.replace("charge", "notice").replace(
      "https",
      "http"
    );
    let url =
      // "http://40.83.114.97/operate/#/notice?token=" +
      HttpUriOnWrite +
      "?token=" +
      SocketAPI.token +
      "&phone=" +
      state.user.mobilephone +
      "&availableBalance=" +
      rootGetters["actual/account/accountInfo"].balance +
      "&type=D";
    return url;
  },
  getNewguideUri: (state, getters, rootState, rootGetters) => {
    let HttpUriOnWrite = HttpUri.replace("charge", "newguide").replace(
      "https",
      "http"
    );
    let url =
      // "http://40.83.114.97/operate/#/notice?token=" +
      HttpUriOnWrite +
      "?token=" +
      SocketAPI.token +
      "&phone=" +
      state.user.mobilephone +
      "&availableBalance=" +
      rootGetters["actual/account/accountInfo"].balance +
      "&type=D";
    return url;
  },
  getCurrentLucky: state => {
    return state.currentLucky;
  },
  getHandLucky: state => {
    return state.currentHandLucky;
  }
};

const actions = {
  /**
   * 添加自选合约
   * @param {*} param0
   * @param {*} arg
   * {
   *      commodityNo:品种编号,
   *      contractNo:合约编号
   * }
   */
  optionalContractAdd({ commit }, arg) {
    return SocketAPI.request("/user/optional/contract/add", arg);
  },

  /**
   * 删除自选合约
   * @param {*} param0
   * @param {*} arg
   * {
   *      commodityNo:品种编号,
   *      contractNo:合约编号
   * }
   */
  optionalContractDelete({ commit }, arg) {
    return SocketAPI.request("/user/optional/contract/delete", arg);
  },
  /**
     * 根据id 查询用户模板
     * @param {*} param0
     * @param {*} arg
     * {

     * }
     */
  userTemplatequery({ commit }, arg) {
    console.log("state.user", state.user);
    return SocketAPI.request("/userTemplate/query", { userId: state.user.id });
  },
  templateRulequery({ commit }, arg) {
    // console.log('state.user',state.user);
    return SocketAPI.request("/templateRule/query", arg);
  },

  /**
   * 自选合约列表
   * @param {*} param0
   */
  optionalContractList({ commit }) {
    // console.log("发送请求合约列表请求");
    SocketAPI.request("/user/optional/contract/list", {});
  },

  actOptionalContractList({ commit, rootGetters }, [result, query, cmd]) {
    for (var i = 0; i < result.length; i++) {
      commit(
        "contractInfo/toggleUserFlag",
        {
          key: result[i].commodityNo + result[i].contractNo,
          flag: true
        },
        {
          root: true
        }
      );
    }
  },

  /**
     * 查询个人信息
     * 返回值
     * {
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
     * @param {*} param0
     * @param {*} arg
     */
  query({ commit }, arg) {
    return SocketAPI.requestDefault("/user/query", arg).catch(res => {});
  },
  getCertification({ commit }, arg) {
    return SocketAPI.request("/user_realname/info", arg);
  },
  certificationApply({ commit }, arg) {
    return SocketAPI.request("/user_realname/apply", arg);
  },
  getRealnameGrade({ commit }, arg) {
    return SocketAPI.request("/realname_grade/query", arg).then(res => {
      if (res) {
        commit("SetRealnameGrade", res);
      }
    });
  },
  /**
     * 实名认证
     * @param {*} param0
     * @param {*} arg
     *
     * 入参
     * {
            idCard (string, optional): 身份证号ID ,
            name (string, optional): 姓名 ,
            userId (integer, optional): 用户Id
        }
     */
  realAuth({ commit }, arg) {
    return SocketAPI.request("/user/realAuth", arg);
  },
  /*
隔夜开启设置
*/
  setovernight: ({ commit }, arg) => {
    return SocketAPI.request("/user/overnight", arg);
  },
  /**
     * 注册
     * @param {*} param0
     * @param {*} arg
     * 入参
     * {
            brokerCode (string, optional): 机构码 ,
            mobilephone (string, optional): 手机号 ,
            password (string, optional): 密码 ,
            platform (string, optional): 终端 = ['PC', 'IOS', 'ANDROID', 'H5', 'WEB']stringEnum:"PC", "IOS", "ANDROID", "H5", "WEB",
            verifyCode (string, optional): 验证码
        }

     */
  register({ commit }, arg) {
    arg.platform = "H5";
    if (arg.brokerCode == null || arg.brokerCode.length == 0) {
      arg.brokerCode = "0000";
    }
    return SocketAPI.request("/user/register", arg);
  },

  /**
     *
     * @param {*} param0
     * @param {*} arg
     *  {
            password (string, optional),
            username (string, optional)
        }
     */
  login({ commit }, arg) {
    arg.platform = "H5";
    return SocketAPI.request("/login", arg).then(res => {
      commit("mutQuery", [res.user]);
      return res;
    });
  },
  logout({ commit }, arg) {
    return SocketAPI.request("/logout", arg);
  },
  /**
     * 根据旧密码更新资金密码
     * @param {*} param0
     * @param {*} arg
     * 入参
     *  {
            newPassword (string, optional): 新密码 ,
            oldPassword (string, optional): 旧密码 ,
            username (string, optional): 用户名
        }
     */
  fund1({ commit }, arg) {
    return SocketAPI.request("/user/update/password/fund1", arg);
  },
  /**
     * 根据验证码更新资金密码
     * @param {*} param0
     * @param {*} arg
     * 入参
     * {
            newPassword (string, optional): 新密码 ,
            username (string, optional): 用户名 ,
            verifyCode (string, optional): 验证码
        }
     */
  fund2({ commit }, arg) {
    return SocketAPI.request("/user/update/password/fund2", arg);
  },
  /**
     * 根据旧密码更新登陆密码
     * @param {*} param0
     * @param {*} arg
     * 入参
     * {
            newPassword (string, optional): 新密码 ,
            oldPassword (string, optional): 旧密码 ,
            username (string, optional): 用户名
        }
     */
  login1({ commit }, arg) {
    return SocketAPI.request("/user/update/password/login1", arg);
  },

  /**
     * 根据验证码更新登陆密码
     * @param {*} param0
     * @param {*} arg
     * 入参
     * {
            newPassword (string, optional): 新密码 ,
            username (string, optional): 用户名 ,
            verifyCode (string, optional): 验证码
        }
     */
  login2({ commit }, arg) {
    return SocketAPI.request("/user/update/password/login2", arg);
  },
  /**
   * 修改用户信息
   * @param {} param0
   * @param {*} arg
   */
  chargeUserinfo({ commit }, arg) {
    return SocketAPI.request("/user/update/profile", arg);
  },
  /////////////////////////////////////////////////////////////////////////验证码
  /**mobilephone
   * 获取图形验证码
   * @param {*} param0
   * @param {*} arg
   */
  codeImage({ commit }, arg) {
    SocketAPI.request("/code/image", {}).then(res => {
      commit("setImgData", res);
    });
  },

  /**
   * 发送短信
   * @param {*} param0
   * @param {*} arg 、
   * 入参：
   * {
   * channelId: "yingtou"--固定
   * channelId: "sld"--施罗德
   * channelId: "jm"--数字币
   * mobilephone:
   * sessionId 获取图形码返回的sessionId
   * verifyCode 图形验证码
   * }
   */
  codeSMSSend({ commit }, arg) {
    arg.channelId = "yingtou";
    return SocketAPI.request("/code/sms/send", arg);
  },

  /**
   * 校验短信验证码
   * @param {*} param0
   * @param {*} arg
   * {
   *  mobilephone
   *  code
   * }
   */
  codeSMSVerify({ commit }, arg) {
    return SocketAPI.request("/code/sms/verify", arg);
  },
  ///////////////////////////////////////////////////////////充值/提现
  /**
   * 申请提现
   * @param {*} param0
   * @param {*} arg
   * 入参{
   * bindId:绑卡ID
   * amount:提现金额
   * fundPassword:交易密码
   * }
   */
  withdrawApply({ commit }, arg) {
    return SocketAPI.request("/withdraw/apply", arg);
  },

  /**
     * 查询提现
     * @param {*} param0
     * @param {*} arg
     * 入参
     * {
     * range:range表示统计范围，0全部，1最近一周，2最近一个月，3最近半年
     * page
     * size
     * }
     * 返回值
     *  {
            code (integer, optional),
            data (Array[UserWithdrawRecordDTO], optional),
            msg (string, optional)
            }UserWithdrawRecordDTO {
            actualAmount: 实际到账
            amount (number, optional): 提现金额 ,
            applyTime (string, optional): 申请提现时间 ,
            status (integer, optional): 提现状态(1待审核，2审核不通过，3审核通过，4提现处理中，5提现成功，6提现失败)
        }
     */
  withdrawQuery({ commit }, arg) {
    // /withdraw/queryPC
    return SocketAPI.request("/withdraw/queryPC", arg);
  },
  ///////////////////////////////////////////////////////银行卡
  /**
   * 绑卡
   * @param {*} param0
   * @param {
   *  bankCardId:银行卡号
   *  name:姓名
   *  mobilePhone:预留手机号
   *  idCard:身份证号
   *  smsCode:短信验证码
   * } arg
   *
   */
  bankCardBind({ commit }, arg) {
    return SocketAPI.request("/bank_card/bind_three", arg);
  },
  /**
   * 入参 start,end,page,size
   * 充值列表
   *
   * actualAmount:实际到账
   * usdtNum：usdt数量
   */

  paymentList({ commit }, arg) {
    // let s = ''
    // return JSON.parse('{"records":[{"id":"1299594323347800064","userId":"1296336654944075776","operatorId":"1296336654944075776","brokerSymbol":"001","thirdOrderId":"0xf3ae2640f945a9a9e0693b181c0837beb25c14791776d010bc7ef649d0913238","amount":11.96,"realAmount":11.96,"actualAmount":11.96,"actualMoney":null,"giveAmount":0,"fee":1,"payType":"链克钱包","channelPayMethodId":null,"channelId":null,"status":"SUCCESS","callbackTime":"2020-08-30 23:00:56","gmtCreate":"2020-08-29 14:26:46","usdtNum":null,"burseAddress":"0x55bbf09d19e33a793f3d5bcc5d06596c46f06d8d","price":null,"merchantName":null,"headImg":null,"type":"USDT","htmlText":null,"hash":"0xf3ae2640f945a9a9e0693b181c0837beb25c14791776d010bc7ef649d0913238"}],"total":3,"size":15,"page":1}')
    return SocketAPI.request("/payment/list", arg);
  },

  /**
   * 入参 start,end,page,size
   * usdt商家列表
   *
   * actualAmount:实际到账
   * usdtNum：usdt数量
   */

  merchantList({ commit }, arg) {
    console.log(arg);

    return SocketAPI.request("/merchant/query/list", arg);
  },

  /**
     *
    Pay
     *
     * actualAmount:实际到账
     * usdtNum：usdt数量
     */

  otcPay({ commit }, arg) {
    return SocketAPI.request("/thirdparty/payment/pay", arg);
  },
  //充值金额获取
  queryRechargeConfig({ commit }, arg) {
    return SocketAPI.request("/systemConfig/queryRechargeConfig", arg);
  },
  /**
   * usdt出售
   *
   * actualAmount:实际到账
   * usdtNum：usdt数量
   */

  otcApply({ commit }, arg) {
    console.log(arg);
    return SocketAPI.request("/withdraw_otc/apply", arg);
  },
  //出售记录
  otcWithdraw({ commit }, arg) {
    return SocketAPI.request("/withdraw_otc/user/page", arg);
  },

  /**
     * 查询用户已绑银行卡列表
     * @param {*} param0
     * @param {*} arg
     *
     * return
     *
     * {
code (integer, optional),
data (Array[BankCardDTO], optional),
msg (string, optional)
}BankCardDTO {
bankCardId (string, optional): 银行卡号 ,
bankCode (string, optional): 所属银行代码 ,
bankName (string, optional): 所属银行名称 ,
branchCode (string, optional): 所属支行代码 ,
branchName (string, optional): 所属支行名称 ,
cityCode (string, optional): 城市代码 ,
cityName (string, optional): 城市名称 ,
icon (string, optional): 银行图标 ,
id (integer, optional): 主键ID ,
idCard (string, optional): 身份证号 ,
mobilePhone (string, optional): 手机号码 ,
name (string, optional): 姓名 ,
provinceCode (string, optional): 省份代码 ,
provinceName (string, optional): 省份名称 ,
userId (integer, optional): 用户ID
}
     */
  bankCardQueryUser({ commit }) {
    return SocketAPI.request("/bank_card/query/user", {});
  },

  bankCardBranchFill({ commit }, arg) {
    return SocketAPI.request("/bank_card/branch/fill", arg);
  },

  ////////////////////////////
  /**
     * 意见反馈
     * @param {*} param0
     *
     * {
            "content": "string",
        }

     */
  feedbackCreate({ commit }, arg) {
    arg.platform = "H5";
    return SocketAPI.request("/user/feedback/create", arg);
  },
  /**
   * 上传图片
   * @param {*} param0
   * @param {*} arg
   */
  uploadheadImg({ commit }, arg) {
    return SocketAPI.request("/trade/user/upload/headImg", arg);
  },

  login1({ commit }, arg) {
    return SocketAPI.request("/user/update/password/login1", arg);
  },
  /**
       * 查询用户钱包列表
       * @param {*} param0
       * @param {*} arg
       *
       * 入参
       * {
              symbol (string, optional): 身份证号ID ,
              userIdList (integer, optional): 用户Id
          }
       */
  burselist({ commit }, arg) {
    return SocketAPI.request("/user/burse/list", arg);
  },
  /**
     * 消息列表
     * @param {*} param0
     * @param {*} arg
     * 入参{page,size}
     * 返回值
     *  {
            content (string, optional): 内容 ,
            id (integer, optional),
            operatorId (integer, optional): 操作员id ,
            send (boolean, optional): 是否发送 ,
            sendTime (string, optional): 发送时间 ,
            title (string, optional): 标题 ,
            userId (integer, optional): 指定用户（null为全部用户）
        }
     */
  messageList({ commit }, arg) {
    return SocketAPI.request("/user/message/list", arg);
  },
  profileList({ commit }, arg) {
    return SocketAPI.request("/user/query/profile/list", arg).catch(res => {});
  },
  /**
   * 保证金券
   * @param {*} param0
   * @param {*} arg
   */
  luckyQuery({ commit }, arg) {
    let params = {
      page: 1,
      size: 20,
      type: 1
    };
    let args = Object.assign(params, arg);
    console.log("请求数据参数", args);
    const rules = [
      "保证金大于等于20U可用保证金券抵扣。|保证金券不支持叠加使用。|需要在有效期内使用。",
      "保证金大于等于10U可用保证金券抵扣。|保证金券不支持叠加使用。|需要在有效期内使用。",
      "保证金小于等于2U可免手续费。|保证金大于2U不免手续费。|保证金券不支持叠加使用。|需要在有效期内使用。",
      "保证金小于等于1U可免手续。|保证金大于1U不免手续。|保证金券不支持叠加使用。|需要在有效期内使用。"
    ];
    const rulesEn = [
      "The margin is greater than or equal to 20U, which can be deducted by margin coupons.|Margin coupons do not support stacking use.|Need to be used within the validity period.",
      "The margin is greater than or equal to 10U, which can be deducted by margin coupons.|Margin coupons do not support stacking use.|Need to be used within the validity period.",
      "The margin is less than or equal to 2U, and the handling fee is exempt.|The margin is greater than 2U and the handling fee is not exempt.|The margin coupon does not support stacking.|It needs to be used within the validity period.",
      "The margin is less than or equal to 1U, and the procedures are exempt.|The margin is greater than 1U. The procedures are not exempt.|The deposit coupons do not support stacking.|It needs to be used within the validity period."
    ];
    const rules2 = [
      "保证金大于等于10U可用保证金券抵扣。|保证金券不支持叠加使用。|需要在有效期内使用。",
      "保证金大于等于20U可用保证金券抵扣。|保证金券不支持叠加使用。|需要在有效期内使用。",
      "保证金大于等于30U可用保证金券抵扣。|保证金券不支持叠加使用。|需要在有效期内使用。",
      "保证金大于等于40U可用保证金券抵扣。|保证金券不支持叠加使用。|需要在有效期内使用。",
      "保证金大于等于80U可用保证金券抵扣。|保证金券不支持叠加使用。|需要在有效期内使用。",
      "保证金大于等于120U可用保证金券抵扣。|保证金券不支持叠加使用。|需要在有效期内使用。"
    ];
    const rules2En = [
      "The margin is greater than or equal to 10U, which can be deducted by margin coupons.|Margin coupons do not support stacking use.|Need to be used within the validity period.",
      "The margin is greater than or equal to 20U, which can be deducted by margin coupons.|Margin coupons do not support stacking use.|Need to be used within the validity period.",
      "The margin is greater than or equal to 30U, which can be deducted by margin coupons.|Margin coupons do not support stacking use.|Need to be used within the validity period.",
      "The margin is greater than or equal to 40U, and the margin coupons can be used to deduct.|Margin coupons do not support stacking use.|It needs to be used within the validity period.",
      "The margin is greater than or equal to 80U, which can be deducted by margin coupons.|Margin coupons do not support stacking use.|Need to be used within the validity period.",
      "The margin is greater than or equal to 120U, which can be deducted by margin coupons.|Margin coupons do not support stacking.|It needs to be used within the validity period."
    ];
    return SocketAPI.requestDefault("/luckyMoney/userPage", args)
      .then(res => {
        let data = res.records;
        let lang = localStorage.getItem("language") || "zh";
        if (data && data.length) {
          data.forEach(d => {
            d.arrow = false;
            d.rules = lang == "en" ? rulesEn : rules;
            d.rules2 = lang == "en" ? rules2En : rules2;
          });
          // commit("setLucky", data);
        }
        return res;
      })
      .catch(res => {});
  },
  /**
   * 手续费折扣券
   * @param {*} param0
   * @param {*} arg
   */
  handLuckyQuery({ commit }, arg) {
    let params = {
      page: 1,
      size: 30,
      type: 1
    };
    let args = Object.assign(params, arg);
    return SocketAPI.requestDefault("/discount/userPage", args);
    // .then(res => {
    //   console.log("/discount/userPage", res);
    //   let data = res.records;
    //   if (data && data.length) {
    //     data.forEach(d => {
    //       d.arrow = false;
    //       d.rules = rules;
    //     });
    //   }
    //   return data;
    // })
    // .catch(res => {});
  },
  /**
   * 抽奖结果
   * @param {*} param0
   * @param {*} arg
   */
  lottery({ commit }, args) {
    return SocketAPI.requestDefault("/lottery", args);
  },
  /**
   * 抽奖次数
   * @param {*} param0
   * @param {*} args
   */
  lotteryCount({ commit }, args) {
    return SocketAPI.requestDefault("/lottery/count/query", args);
  },
  queryActivity({ commit }, args) {
    args = {
      page: 1,
      size: 50
    };
    return SocketAPI.requestDefault("/luckyMoney/queryActivity", args).then(
      res => {
        return res.filter(d => d.current);
      }
    );
  },
  queryUserLorrerySummer({ commit }, args) {
    return SocketAPI.requestDefault(
      "/user/lottery/queryUserLorrerySummer",
      args
    );
  },
  queryLorreryList({ commit }, args) {
    args = {
      page: 1,
      size: 20
    };
    return SocketAPI.requestDefault("/user/lottery/queryList", args);
  }
};
const mutations = {
  UPDATE_USERINFO(state, args) {
    state.userInfo.headImg = args.headImg;
  },
  SetRealnameGrade(state, res) {
    state.regulations = res;
  },
  mutQuery(state, [userInfo, param, cmd]) {
    let user = new User();
    user.merge(userInfo);
    console.log(userInfo);
    state.user = user;
    state.isLogin = true;
  },
  setIsLogin(state, isLogin) {
    state.isLogin = isLogin;
  },
  // setToken(state, token) {
  //     state.token = token
  // },
  setclearuser(state) {
    state.user = new User();
  },
  setImgData(state, res) {
    console.log(res);

    if (res.image) {
      state.imgData.data = res.image;
    }
    if (res.sessionId) {
      state.imgData.sessionId = res.sessionId;
    }
  },
  setRealAuth(state) {
    state.user.realAuth = true;
  },
  setAdvancedRealAuth(state) {
    state.user.advancedRealAuth = true;
  },
  // 查询用户所有红包
  setLucky(state, data) {
    // 查询用户所有红包
    console.log("查询用户红包", data);
    state.userLucky = data;
  },
  setCurrentlucky(state, item) {
    // 当前红包
    state.currentLucky = item;
  },
  setHandLucky(state, item) {
    // 选中手续费折扣券
    state.currentHandLucky = item;
  },
  updateLuckyDatay(state, item) {
    if (state.userLucky && state.userLucky.length > 0) {
      let index = state.userLucky.findIndex(d > d.id == item.id);
      console.log("改变红包索引", index);
    }
  },
  clearCurrentLucky(state) {
    state.currentLucky = null;
  },
  clearHandLucky(state) {
    state.currentHandLucky = null;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
