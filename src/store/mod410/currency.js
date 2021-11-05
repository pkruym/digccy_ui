import {
    SocketAPI
} from "@/assets/js/WsApi2";

import {
    Currency
} from '@/assets/js/Object/Currency'


/*
{
      "id": "1",
      "symbol": "USD",
      "name": "美元",
      "rate": 6.71,
      "flag": "$",
      "type": "TRADE", //stringEnum:"TRADE", "PAY", "WITHDRAW"
    },

    合并成
    {     
      "id": "1",
      "symbol": "USD",
      "name": "美元",
      "rate": {
          "TRADE":  6.71,
          "PAY": 6.75,
          "WITHDRAW": 6.68
      },
      "flag": "$",
    }
*/
const state = {
    data: {}        // [symbol: string]
}
const getters = {
    getCurrency: (state) => {
        return (symbol) => {
            if(state.data[symbol]) {
                return state.data[symbol]
            }
            return {}
        }
    }
}
const actions = {
    init: () => {
        return SocketAPI.requestDefault('/currency/list',{
            size: 1000,
            page:1,
            type:'TRADE'
        })
    },
    actList: (ctx, [res, param, cmd]) => {
        // console.log("currency list done!")
    }
}

const mutations = {
    mutList: (state, [res, param, cmd]) => {
        for(let i = 0; i < res.records.length; i ++) {
            let node = res.records[i]
            let symbol = node.symbol

            if(!state.data[symbol]) {
                state.data[symbol] = new Currency(node)
            } else {
                state.data[symbol].merge(node)
            }
            
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
