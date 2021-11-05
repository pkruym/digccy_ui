import { MarketAPI } from "@/assets/js/MarketApi2";

const state = {
  data: {}
};
const getters = {
  getCommodity: state => {
    return symbol => {
      if (state.list[symbol]) {
        return state.list[symbol];
      }
      return {};
    };
  },
  commodityList: state => {
    return state.data;
  }
};

const actions = {
  init: ({ commit }) => {
    return MarketAPI.requestDefault("/symbol/list");
    // return MarketAPI.request('/symbol/list').then((res)=>{
    //   console.log('ressymbol/listsymbol/listsymbol/list',res);
    //   commit('initCommodity', res)
    // });
  },
  actList: (ctx, [res, param, cmd]) => {
    // console.log("commodity list done!")
  },
  actOnPush: ({ commit, state, getters, rootGetters, dispatch }, res) => {
    dispatch("contractInfo/updateCommodity", null, { root: true });
  }
};

const mutations = {
  initCommodity: (state, array) => {
    state.list = array;
    console.log("合约行情列表：", array);
  },
  mutList: (state, [res, param, cmd]) => {
    console.log("symbol/listresresres", res);
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
