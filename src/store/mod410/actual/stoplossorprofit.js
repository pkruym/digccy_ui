import {
    SocketAPI
} from "@/assets/js/WsApi2";

import busVue from "@js/bus"

const state = {
    list: [],
    buyDetail: {}, //存储下单页面跳转止盈止损设置页面之前的更改数据
    ceshi: {}, //交易品种id
    value: true, //是否生效,默认生效
    type: 'actual',
}
const getters = {
    SOPList: (state) => {
        return state.list
    },
    // 可能返回null
    getSOPSetting: (state) => {
        return ({
            commodityNo,
            direct
        }) => {
            let arr = state.list.filter(v => v.enable == "VALID" && v.commodityNo == commodityNo && v.direct == direct)
            if (arr.length > 0) {
                return arr[0]
            }
            return null // 没找到返回null
        }
    },
    getBuyDetail: (state) => {
        return state.buyDetail
    },

    getCeshi: (state) => {
        console.log('fromget');

        return state.ceshi
    },
    getValue: (state) => {

        return state.value
    },
}
const actions = {
    /**
     * 删除单个止损止盈预设置
     * @param {*} param0 
     * @param {*} arg 
     * {
            id (integer, optional): 预设值编号ID
        }
     */
    delOne({
        commit
    }, arg) {
        return SocketAPI.request('/'+state.type+"/commodity/lossorprofit/delOne", arg);
    },

    /**
    * 获取所有品种止损止盈预设置
    * @param {*} param0 
    * @param {*} arg 
    * 返回参数
        {
            commodityName (string, optional): 商品名称 ,
            commodityNo (string, optional): 商品编号 ,
            direct (string, optional): 买涨(BUY)或卖跌(SELL) = ['BUY', 'SELL']stringEnum:"BUY", "SELL",
            enable (string, optional): 是否有效 = ['INVALID', 'VALID']stringEnum:"INVALID", "VALID",
            id (integer, optional): 主键Id ,
            stopLossPoint (integer, optional): 止损点位 ,
            stopProfitPoint (integer, optional): 止盈点位
        }
    */
    getList({
        commit,
        rootGetters
    }) {
        // console.log(11212)
        return SocketAPI.request('/'+state.type+"/commodity/lossorprofit/getList", {}).then((res) => {
            let arr = []
            if (res) {
                for (let i = 0; i < res.length; i++) {
                    let info = rootGetters["commodity/getCommodity"](res[i].commodityNo)
                    res[i].name = info.name
                    res[i].commodityNo = info.symbol
                }
                arr = res
            }
            commit("setList", arr)
        })
    },

    /**
     * 预设品种止损止盈点位
     * @param {*} param0 
     * 入参
     *  {
            commodityNo (string, optional): 商品编号 ,
            direct (string, optional): 设置方向：买涨或卖跌 = ['BUY', 'SELL']stringEnum:"BUY", "SELL",
            enable (string, optional): 是否有效：无效 INVALID, 有效 VALID = ['INVALID', 'VALID']stringEnum:"INVALID", "VALID",
            stopLossPoint (integer, optional): 止损点位 ,
            stopProfitPoint (integer, optional): 止盈点位
        }
     */
    preset({
        commit
    }, arg) {
        return new Promise((resolve, reject) => {
            SocketAPI.request('/'+state.type+"/commodity/lossorprofit/preset", arg).then(res => {
                busVue.$emit('PALSet')
                resolve(res)
            }).catch((reason) => {
                reject(reason)
            })
        })
    },
    /**
     * buy-detail下单页面数据存储
     * @param commit
     * @param state
     * @param params
     * 返回的参数
     * {
     *     value
     * }
     */
    changeBuyDetail({
        commit,
        state
    }, params) {
        // console.log('99', params)
        commit("setBuyDetail", params)
            // console.log('params', params);
    },

    changeCeshi({
        commit,
        state
    }, value) {
        // console.log('ceshi', value);
        commit("setCeshi", value)
    },
    changeValue({
        commit,
        state
    }, value) {
        // console.log('value', value);
        commit("setValue", value)
    },
}
const mutations = {
    changeDiskStatus(state,{type}){
        state.type = type
    },
    setList(state, res) {
        state.list = res
    },
    setBuyDetail(state, res) {
        state.buyDetail = res
    },

    setCeshi(state, value) {
        state.ceshi = value
    },

    setValue(state, value) {
        state.value = value
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}