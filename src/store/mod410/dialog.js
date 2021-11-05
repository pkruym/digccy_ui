
import busVue from "@/assets/js/bus";


const state = {
    isShow: false,
    content: {
        title: ''
    },
    type: '',
    TradingContent: null,
    d: null
}

// getters
const getters = {
    getdialog: (state) => {
        return state
    },
    getTradingContent: (state) => {
        return state.TradingContent
    },
}


const actions = {

    //打开弹出框
    changeShow({
        commit,
        state
    }, {
        isShow,
        title,
        type,
        d
    }) {
        let params = {
            isShow: isShow,
            title: title,
            type: type,
            d: d
        };
        commit("setDialogState", params)
        // console.log('params', params);
        busVue.$emit("dialogShow", params); // {isShow, title, type, d}
    },
    changeContent({
        commit,
        state
    }, params) {
        commit("setDialogContent", params)
        // console.log('params', params);
    },


}
const mutations = {
    setDialogState(state, params) {
        // busVue.$emit("dialogShow", params.isShow);
        state.content.title = params.title
        state.type = params.type
        state.d = params.d
    },
    setDialogContent(state, params) {
        state.TradingContent = params
    },

}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}