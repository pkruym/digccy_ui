// import {
//     SocketAPI
// } from "@/assets/js/MarketApi2";
import { MarketAPI } from "@/assets/js/MarketApi2";
// import {
//     subscribe,
//     unsubscribe
// } from "@/assets/js/futuresdata"

// import {
//     SymbolInfos
// } from "@/assets/js/config/symbolInfo"
import i18n from "./../../lang";

import { seeRules, seeRule_en } from "@/assets/js/config";

import { ContractInfo } from "@/assets/js/Object/ContractInfo";

/*
 */
const state = {
  list: [], // 整体列表
  index: 0, // 选中的哪项

  listName: [], // 所有合约名称
  commodityList: [], //所有品种
  symbols: [], //所有品种
  // 右边历史明细
  transactionList: [],
  tabIndex: 1
};

const getters = {
  // 内部使用
  getContractInfo: (state, rootGetters) => {
    return ({ symbol }) => {
      let x = state.list.filter(v => v.symbol == symbol);
      if (x.length > 0) {
        // console.log('11122222',x[0]);
        return x[0];
      } else {
        return new ContractInfo();
      }
    };
  },
  getContractInfoList: state => {
    return state.list;
  },

  // 显示
  getMainForceList: state => {
    // console.log(state.list);

    return marketType => {
      return state.list;
    };
  },
  getUserList: state => {
    return marketType => {
      return state.list.filter(
        v => v.userFlag === true && v.marketType === marketType
      );
    };
  },
  getListByExchangeNo: state => {
    return (code, marketType) => {
      return state.list.filter(
        v => v.exchangeNo == code && v.marketType === marketType
      );
    };
  },
  getListByMarketType: state => {
    return tradeType => {
      let _list = state.list.filter(t => t.tradeType === tradeType);
      if (tradeType === "FUTURE") {
        // 合约分组
        /*
         *CW:当周  NW：次周 CQ：季度
         */
        let emnus = {
          CW: i18n.t("stock.text33"),
          NW: i18n.t("stock.text34"),
          CQ: i18n.t("stock.text35")
        };
        let cates = [];
        _list.forEach((item, i) => {
          let symbol = item.symbol;
          let group = symbol.split("_");
          let firstName = group[0];
          let nextName = group[1];
          let secondName = emnus[nextName.substring(0, 2)];
          let thirdName = nextName.substring(2, nextName.length);
          let fullName = firstName + secondName + thirdName;
          item.fullName = fullName;
          item.labelName = firstName + i18n.t("stock.text36");
          if (!cates.includes(firstName)) {
            cates.push(firstName);
          }
        });
        // console.log("catescatescates", cates);
        let resultArr = [];
        cates.forEach((name, i) => {
          let _data = _list.filter(d => name === d.symbol.split("_")[0]);
          let obj = {
            labelName: _data.length > 0 ? _data[0].labelName : "",
            data: _data
          };
          resultArr.push(obj);
        });
        _list = resultArr;
      }
      // console.log("处理后的合约列表数据", _list);
      return _list;
    };
  },
  //HotVariety页面需要
  getListByAppRecommend: state => {
    console.log("推荐：", state.list.filter(v => v.hot));
    return state.list.filter(v => v.hot);
  },
  // 推荐杠杆
  getListByAppRecommendGg: state => {
    console.log(
      "推荐杠杆：",
      state.list.filter(v => v.hot && v.tradeType == "LEVER")
    );
    return state.list.filter(v => v.hot && v.tradeType == "LEVER");
  },
  // 推荐合约
  getListByAppRecommendHy: state => {
    console.log(
      "推荐合约：",
      state.list.filter(v => v.hot && v.tradeType == "FUTURE")
    );
    return state.list.filter(v => v.hot && v.tradeType == "FUTURE");
  },

  // 所有合约的名字列表
  contractListName: state => {
    return state.listName;
  },

  // 选中的那一个
  contractInfo: state => {
    let obj = state.list[state.index];
    if (!obj) {
      return new ContractInfo();
    }
    console.log("选中的那一个", obj);
    return obj;
  },
  // 活动规则使用
  queryContractInfo: (state, rootGetters) => {
    return ({ symbol }) => {
      let x = state.list.find(v => v.symbol.includes(symbol));
      if (x) {
        return x;
      } else {
        return new ContractInfo();
      }
    };
  },
  // transactionList
  transactionList: state => state.transactionList,
  seeRule_en: state => {
    return ({ tradeType, symbol }) => {
      let obj = {
        value: ""
      };
      let arr1 = [];
      let arr2 = [];
      if (state.list.length <= 0) {
        return {
          arr1,
          arr2
        };
      }
      let info = null;
      info = state.list[state.index];
      if (symbol) {
        info = state.list.find(t => t.symbol == symbol);
      }
      if (tradeType === "LEVER") {
        Object.keys(seeRule_en).forEach(key => {
          if (info.symbol == key) obj = seeRule_en[key];
        });
      } else {
        obj = seeRule_en["合约交易"];
      }
      obj.openFee = info.openFee;
      obj.closeFee = info.closeFee;
      obj.minBuyVolume = info.minBuyVolume;
      obj.maxBuyVolume = info.maxBuyVolume;
      obj.logoName = info.logoName;
      obj.symbol = info.symbol;
      obj.perContractValue = info.perContractValue;
      obj.pricePrecision =
        "0." + ("0000000000000000" + 1).substr(-info.pricePrecision);
      obj.leverageList = info.leverageList;

      for (let k in obj) {
        let v = obj[k];
        let o = {
          key: k,
          value: v
        };
        if (Object.prototype.toString.call(v) === "[object Array]") {
          arr2.push(o);
        } else {
          arr1.push(o);
        }
      }
      return {
        arr1,
        arr2
      };
    };
  },
  seeRule: state => {
    return ({ tradeType, symbol }) => {
      let obj = {
        value: ""
      };
      let arr1 = [];
      let arr2 = [];
      if (state.list.length <= 0) {
        return {
          arr1,
          arr2
        };
      }
      let info = null;
      info = state.list[state.index];
      if (symbol) {
        info = state.list.find(t => t.symbol == symbol);
      }
      if (tradeType === "LEVER") {
        Object.keys(seeRules).forEach(key => {
          if (info.symbol == key) obj = seeRules[key];
        });
      } else {
        obj = seeRules["合约交易"];
      }
      obj.openFee = info.openFee;
      obj.closeFee = info.closeFee;
      obj.openFee = info.openFee;
      obj.closeFee = info.closeFee;
      obj.minBuyVolume = info.minBuyVolume;
      obj.maxBuyVolume = info.maxBuyVolume;
      obj.logoName = info.logoName;
      obj.symbol = info.symbol;
      obj.perContractValue = info.perContractValue;
      obj.pricePrecision =
        "0." + ("0000000000000000" + 1).substr(-info.pricePrecision);
      obj.leverageList = info.leverageList;

      for (let k in obj) {
        let v = obj[k];

        let o = {
          key: k,
          value: v
        };
        if (Object.prototype.toString.call(v) === "[object Array]") {
          arr2.push(o);
        } else {
          arr1.push(o);
        }
      }
      return {
        arr1,
        arr2
      };
    };
  }
};

const actions = {
  init: ({ commit, state, getters, rootGetters, dispatch }) => {
    return new Promise((resolve, reject) => {
      Promise.all([
        dispatch("commodity/init", null, {
          root: true
        }),
        dispatch("contract/init", null, {
          root: true
        })
      ])
        .then(([v2, v1]) => {
          console.log("commodityList", v2, v1);
          let result = [];
          for (let j = 0; j < v1.length; j++) {
            let node = v1[j];
            let x = new ContractInfo(node.symbol, node.name);

            let setitem = v2.filter(t => t.symbol == node.symbol);
            if (setitem && setitem[0]) {
              x.setsymbolPrecision(
                node.symbol,
                setitem[0].pricePrecision ? setitem[0].pricePrecision : 0,
                setitem[0].volumePrecision ? setitem[0].volumePrecision : 0
              );
            }
            x.merge(node);
            result.push(x);
          }
          let symbols = result.map(v => v.symbol);
          sessionStorage.setItem("contractList", JSON.stringify(result));
          MarketAPI.request("/tick/list", {
            symbols: symbols
          })
            .then(res => {
              if (res) {
                console.log("行情返回", res);
                for (let i = 0; i < res.length; i++) {
                  let node = res[i];
                  if (node) {
                    let xx = result.filter(v => v.symbol == node.symbol);
                    if (xx.length > 0) {
                      xx[0].merge(node);
                    }
                  }
                }
              }
              commit("initContract", result);
              resolve(result);
            })
            .catch(reason => {
              reject(reason);
            });
          commit("initsymbols", symbols);
        })
        .catch(reason => {
          reject(reason);
        });
    });
  },
  symbolSubscribe: ({ commit }, { symbol }) => {
    return new Promise((resolve, reject) => {
      MarketAPI._init(symbol);
    });
  },
  getTick: ({ commit, state, getters, rootGetters, dispatch }) => {
    return new Promise((resolve, reject) => {
      MarketAPI.request("/tick/list", {
        symbols: state.symbols
      })
        .then(res => {
          if (res) {
            for (let i = 0; i < res.length; i++) {
              let node = res[i];
              if (node) {
                let xx = state.list.filter(v => v.symbol == node.symbol);
                if (xx.length > 0) {
                  commit("mergeCommodity", xx);
                }
              }
            }
          }
          resolve(res);
        })
        .catch(reason => {
          reject(reason);
        });
    });
  },
  updateCommodity: ({ commit, state, getters, rootGetters, dispatch }) => {
    return new Promise((resolve, reject) => {
      dispatch("commodity/init", null, {
        root: true
      })
        .then(res => {
          // commodity
          commit("mergeCommodity", res);
          resolve(res);
        })
        .catch(reason => {
          reject(reason);
        });
    });
  },
  addContract: ({ commit, state, getters, rootGetters, dispatch }) => {
    console.log("新增合约合约列表：", obj);
  }
};

const mutations = {
  setTabIndex(state, index) {
    state.tabIndex = index;
  },
  initcommodity: (state, array) => {
    state.commodityList = array;
  },
  initsymbols: (state, array) => {
    state.symbols = array;
  },
  initContract: (state, array) => {
    state.list = array;
    console.log("合约列表：", array);

    let xx = state.list;
    if (xx.length > 0) {
      state.index = state.list.indexOf(xx[0]);
    } else {
      state.index = 0;
    }

    state.listName = array.map(v => {
      return {
        id: v.key,
        label: v.contractName
      };
    });
    console.log("合约列表：", array.map(v => v.contractName));
  },

  // 选择选中的那个
  selectContract: (state, { symbol }) => {
    if (symbol && symbol != "") {
      for (let i = 0; i < state.list.length; i++) {
        let obj = state.list[i];
        if (obj.symbol == symbol) {
          if (state.index != i) {
            state.index = i;
            // 清一下明细
            state.transactionList = [];
          }
          return;
        }
      }
      console.error("没找到合约：", symbol);
      return;
    }
  },

  // 改自定义状态
  toggleUserFlag(state, { key, flag }) {
    for (let i = 0; i < state.list.length; i++) {
      let obj = state.list[i];
      if (obj.key == key) {
        if (flag) {
          state.list[i].userFlag = true;
        } else {
          state.list[i].userFlag = !state.list[i].userFlag;
        }
        setUserFlag(state.list[i].userFlag);
        return;
      }
    }
  },

  // 更新Commodity
  mergeCommodity: (state, res) => {
    for (let i = 0; i < res.length; i++) {
      let node = res[i];
      let xx = state.list.filter(v => v.symbol == node.symbol);
      if (xx.length > 0) {
        xx[0].merge(node);
      }
    }
  },

  //
  mergeContract: (state, res) => {
    for (let i = 0; i < res.length; i++) {
      let node = res[i];
      let key = node.commodityNo + node.symbol;
      let xx = state.list.filter(v => v.key == key);
      if (xx.length > 0) {
        xx[0].merge(node);
      }
    }
  },

  //
  mergeQuote: (state, res) => {
    console.log("resresresresresresresresres", res);
    for (let i = 0; i < res.length; i++) {
      let node = res[i];
      let key = node.commodityNo + node.contractNo;
      let xx = state.list.filter(v => v.key == key);
      if (xx.length > 0) {
        xx[0].merge(node);
      }
    }
  },

  // update
  updateContract: (state, { symbol, node }) => {
    let xx = state.list.filter(v => v.symbol == symbol);
    if (xx.length > 0) {
      xx[0].merge(node);
      // console.log('updateContract',state.list);
    }
  },

  // 明细
  clearTransactionList(state) {
    state.transactionList = [];
  },
  updateTransactionList(state, { time, price, size }) {
    let v = {
      time: time.Format("hh:mm:ss"),
      price: price,
      size: size
    };
    state.transactionList.unshift(v);
    if (state.transactionList.length > 10) {
      state.transactionList.pop();
    }
    // console.log('state.transactionList',state.transactionList);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
