import account from './actual/account'
import order from './actual/order'
import position from './actual/position'
import stoplossorprofit from './actual/stoplossorprofit'
import tradeinfo from './actual/tradeinfo'
import traderecord from './actual/traderecord'

export default {
    namespaced: true,
    modules: {
        account,
        order,
        position,
        stoplossorprofit,
        tradeinfo,
        traderecord
    }
}
