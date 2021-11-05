const  Vue =require('vue')
const  Vuex =require('vuex')

import footerdrag from './mod410/footerdrag'
import dialog from './mod410/dialog'
import actual from './mod410/actual'
import commodity from './mod410/commodity'
import contract from './mod410/contract'
import contractInfo from './mod410/contractInfo'
import currency from './mod410/currency'
import user from './mod410/user'
import trading from './mod410/trading'
import system from './mod410/system'
import aside from './mod410/aside'
import userfollower from './mod410/userfollower'



import createPersistedState from "vuex-persistedstate"

import createSocketAPI from './plugins/socketapi'

const debug = process.env.NODE_ENV !== 'production'

//debug ? [createLogger(), createPersisted] : [createPersisted]
const plugins = debug ? [createSocketAPI()] : [createSocketAPI()]

const createPersisted = createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
        return {
            // 只储存state中的account.js里面的 state
            // account: val.account,
            // contract: val.contract,
        }
    }
})

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        // account,
        // contract,
        // order,
        // onpush,
        // trading,
        dialog,
        // news,
        footerdrag,

        actual,
        commodity,
        contract,
        contractInfo,
        currency,
        trading,
        user,
        system,
        aside,
        userfollower
    },
    changetradeType(state, { tradeType }) {
        state.tradeType = tradeType
    },
    strict: debug,
    // plugins: debug ? [createLogger(), createPersisted] : [createPersisted]
    plugins: plugins,
    state: {
        tradeType: 'LEVER'
    },
    actions: {

    },
    mutations: {
        changetradeType(state, { tradeType }) {
            state.tradeType = tradeType
        },
    }
})
