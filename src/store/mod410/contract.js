import { SocketAPI } from "@/assets/js/WsApi2";

import { getContractInfo } from "@/assets/js/utils";
/*
    {
      "id": "1114042772295254016",
      "symbol": "1905",
      "commodityNo": "SL",
      "firstNotifyTime": "2019-04-08 11:18:49",
      "lastTradeTime": "2019-04-08 11:18:52",
      "forceCloseTime": "2019-04-08 11:18:56",
      "expiredTime": "2019-04-09 12:18:54",
      "maxBuyPositionVolume": 100,
      "maxSellPositionVolume": 100,
      "maxTradeVolume": 10,
      "main": true,
      "appRecommend": false,
      "enable": true,
      "gmtCreate": "2019-04-05 13:51:09",
      "status": null
    },
*/
const state = {
  data: {}
};

const getters = {};

const actions = {
  init: () => {
    let param = {
      param: 1,
      size: 100
    };
    return SocketAPI.requestDefault("/instrument/list", param);
  },
  // 查询单个品种所有信息
  query: ({ commit }, args) => {
    return SocketAPI.requestDefault("/instrument/query", args);
  },
  addContrct({ commit, rootGetters }, [result, query, cmd]) {
    return commit("contractInfo/addContract", result, { root: true });
  },
  actList: (ctx, [res, param, cmd]) => {
    // console.log("contract list done!")
  },
  queryAppRecommend({ commit, rootGetters }) {
    let arg = {
      size: 10,
      page: 1,
      appRecommend: true
    };

    return new Promise((resolve, reject) => {
      let arr = [];
      SocketAPI.request("/contract/queryAppRecommend", arg)
        .then(res => {
          // console.log('211112111121111á22211111111',res);
          for (var i = 0; i < res.records.length; i++) {
            let node = res.records[i];
            node.contractNo = node.symbol;
            let info = getContractInfo(rootGetters, node);
            if (info.symbol == "") {
              // actions.addContrct([node]);
              //    dispatch('contractInfo/addContract', node)
            }
            arr.push(info);
          }
          resolve(arr);
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }
};

const mutations = {
  mutList: (state, [res, param, cmd]) => {
    for (let i = 0; i < res.length; i++) {
      let node = res[i];
      state.data[node.symbol] = node;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
