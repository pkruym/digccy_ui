import {
    SocketAPI
} from "@/assets/js/WsApi2";

const state = {
    type: 'actual',
}
const getters = {}
const actions = {

    /**
     * 查询用户交易详情
     * @param {*} param0 
     * @param {*} arg 
     * 
     *  {
            id (integer, optional),
            todayFee (number, optional): 今日手续费 ,
            todayOvernightFee (number, optional): 今日隔夜费 ,
            todayProfit (number, optional): 今日盈亏 ,
            todayRechargeAmount (number, optional): 今日充值金额 ,
            todayWithdrawAmount (number, optional): 今日提现金额 ,
            totalCloseCount (integer, optional): 平仓总订单 ,
            totalCloseVolume (integer, optional): 平仓总手数 ,
            totalFee (number, optional): 总手续费 ,
            totalOvernightFee (number, optional): 总隔夜费 ,
            totalProfit (number, optional): 总盈亏 ,
            totalProfitCount (integer, optional): 盈利总订单 ,
            totalRechargeAmount (number, optional): 总充值金额 ,
            totalWithdrawAmount (number, optional): 总提现金额 ,
            userId (integer, optional): 用户id
            }
     */
    query({
        commit,
        state
    }) {
        return SocketAPI.requestDefault('/'+state.type+"/tradeInfo/query", {});
    },

    actTradeInfoQuery({
        commit,
        rootGetters
    }, [result, query, cmd]) {
        return commit('actual/account/setTradeInfoQuery', result, { root: true })
    }
}
const mutations = {
    changeDiskStatus(state,{type}){
        state.type = type
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
