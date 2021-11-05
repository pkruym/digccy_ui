import { SocketAPI } from "@/assets/js/WsApi2";

const state = {
  netState: 1, // 0 有问题，1，没问题
  currencySymbol: 2,
  currentWithdrawAddress: null // 当前选中的地址
};
const getters = {
  netState: state => {
    return state.netState;
  },
  getCurrentWithdraw: state => {
    return state.currentWithdrawAddress;
  },
  getCurrentAddress: state => {
    return state.currentWithdrawAddress
      ? state.currentWithdrawAddress.address
      : "";
  }
};
const actions = {
  /**
     *查询系统公告
     * @param {*} param0
     * @param {*} arg
     入参
     {
         page:
         size:
     }
     返回值
     [
          {
                content (string, optional): 内容 ,
                end (string, optional): 结束时间 ,
                gmtCreate (string, optional): 创建时间 ,
                id (integer, optional): 公告Id ,
                operatorId (integer, optional): 操作Id ,
                start (string, optional): 开始时间 ,
                title (string, optional): 公告标题 ,
                url (string, optional): 链接地址
        }
     ]
     */
  noticeList({ commit }, arg) {
    return SocketAPI.request("/system/notice/list", arg);
  },
  // GET / system / notice / listIndexAlert
  noticeIndex({ commit }, arg) {
    arg = {
      page: 1,
      size: 10
    };
    return SocketAPI.request("/system/notice/listIndexAlert", arg);
  },
  tradelist({ commit }, arg) {
    return SocketAPI.request("/system/info/trade/list", arg);
  },
  /*
      获取首页banner
       {
          description (string, optional): 轮播图描述 ,
          id (integer, optional): 轮播图id ,
          imgUrl (string, optional): 图片地址 ,
          seq (integer, optional): 轮播顺序 ,
          skipUrl (string, optional): 跳转地址
        },
     */
  getbanner: () => {
    return SocketAPI.requestDefault("/system/banner/list");
  },
  /*
    查询图片服务器地址
     */
  getUrlImage: () => {
    return SocketAPI.requestDefault("/system/url/image");
  },
  /*
    查询马甲包地址
     */
  getvestApp: ({ commit }, arg) => {
    return SocketAPI.request("/system/vestApp", arg);
  },
  /**
   * 快讯
   * 入参
   * {
   *     pageTime:   query string 查询资讯时间，不传表示查询最新资讯（例如传2019-04-11 08:00:00，表示查询11号8点之前的资讯）
   *     size:   query   integer
   * }
   *
   * 返回值
   * {
   *     content (string, optional): 快讯内容 ,
gmtRelease (string, optional): 资讯发布时间 ,
hasMore (boolean, optional): 是否有查看更多 ,
id (integer, optional): 主键id ,
moreLink (string, optional): 更多跳转链接 ,
newsNo (string, optional): 快讯编号 ,
strDayRelease (string, optional): 资讯发布日期（yyyy-MM-dd） ,
strTimeRelease (string, optional): 资讯发布时分秒（HH:mm:ss）
   * }
   */
  getnewsFlash({ commit }, arg) {
    return SocketAPI.request("/system/info/news/list", arg);
  },
  ///system/helpImageGuide 图文帮助列表
  getHelpImageGuide({ commit }, arg) {
    return SocketAPI.request("/system/helpImageGuide", arg);
  },

  ///system/helpProblem  //常见问题
  getHelpProblem({ commit }, arg) {
    return SocketAPI.request("/system/helpProblem", arg);
  },

  /*
  查询策略列表
  入参
  {
    recommend    boolean  是否推荐，true是，false否
    page
    size
  }
  返回值
  {
    appStrategy (boolean, optional): 是否在app显示：false不显示，ture显示 ,
author (string, optional): 作者 ,
clickFollowNum (integer, optional): 点击数 ,
commodityNo (string, optional): 品种编号 ,
content (string, optional): 内容 ,
contentImg (string, optional): 内容图片地址 ,
contractNo (string, optional): 合约编号 ,
enable (boolean, optional): 是否启用:false未上线，ture已上线 ,
gmtCreate (string, optional): 创建时间 ,
headImg (string, optional): 头像地址 ,
id (integer, optional): 主键Id ,
operatorId (integer, optional): 操作人Id ,
pcStrategy (boolean, optional): 是否在pc显示：false不显示，ture显示 ,
recommend (boolean, optional): 是否推荐：true代表推荐，false代表未推荐 ,
title (string, optional): 标题
  }
   */
  getstrategyList({ commit }, arg) {
    if (arg == null) {
      arg = {
        recommend: true,
        page: 1,
        size: 10
      };
    }
    console.log("发送快讯请求", arg);
    return SocketAPI.request("/system/info/strategy/list", arg);
  },

  /* 统计策略次数*/
  getstrategyCount: ({ commit }, arg) => {
    return SocketAPI.request("/system/info/strategy/count", {
      strategyId: arg
    });
  },

  // 查询微信
  // getWxcode: () => {
  //   console.log("微信二维码");
  //   return SocketAPI.requestDefault("/system/customer/list");
  // },

  // // 查询交易动态
  // infotradelist: () => {
  //   console.log("微信二维码");
  //   return SocketAPI.requestDefault("/system/system/infotradelist");
  // },
  // 查询手续费费率
  queryFee: () => {
    return SocketAPI.request("/systemConfig/query/fee");
  },
  // 查询个人信息
  userQuery: () => {
    return SocketAPI.requestDefault("/user/query");
  },
  // 提币
  applyBurse: ({ commit }, arg) => {
    return SocketAPI.request("/withdraw/apply/burse", arg);
  },
  // 查询可提现金额及时间
  queryWithdrawTime: () => {
    return SocketAPI.request("/systemConfig/query/withdrawTime");
  },

  // 查询银行卡列表
  querybankList: () => {
    return SocketAPI.request("/bank_card/bankList");
  },
  withdrawTime: () => {
    return SocketAPI.request("/withdraw/isWithdrawTime");
  },
  configQuery: () => {
    return SocketAPI.request("/config/query", {
      symbol: "incomeAmount"
    });
  },
  //查询钱包充币地址列表GET /paycoin_passageway/queryDisplayList
  queryDisplayList: () => {
    return SocketAPI.request("/paycoin_passageway/queryDisplayList", {});
  },
  //用户添加提币地址
  addWithdraw: ({ commit }, arg) => {
    return SocketAPI.request("/user_withdraw_burse/bind", arg);
  },
  //用户删除提币地址
  unWithdraw: ({ commit }, arg) => {
    return SocketAPI.request("/user_withdraw_burse/unbind", arg);
  },
  //提币地址列表
  queryWithdrawList: () => {
    return SocketAPI.request("/user_withdraw_burse/userList");
  }
};
const mutations = {
  setNetState(state, netState) {
    state.netState = netState;
  },
  setCurrentWithdraw(state, data) {
    state.currentWithdrawAddress = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
