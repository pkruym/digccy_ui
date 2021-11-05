const state = {
    asideKeyIndex: 1,
    // asideKeyIndex: 1, //施罗德
    // asideKeyIndex: 2, //数字货币
}

// getters
const getters = {
    asideKeyIndex: (state) => {
        return state.asideKeyIndex
    },
}


const actions = {
    changeAsideKeyIndex({
        commit,
        state
    }, params) {
        commit("setAsideKeyIndex", params)
    },
}
const mutations = {
    setAsideKeyIndex(state, params) {
        state.asideKeyIndex = params
    },
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}