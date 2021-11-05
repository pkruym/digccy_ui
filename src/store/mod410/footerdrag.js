const state = {
    draggable: false,
    draging: false
}

// getters
const getters = {
    getDraggAble: (state) => {
        return state.draggable
    },
    getDragIng: (state) => {
        return state.draging
    },
}


const actions = {

    //
    changeDragState({
        commit,
        state
    }) {
        commit("setDragState")
    },
    //
    changeDragIng({
        commit,
        state
    }, parmas) {
        commit("setDragIng", parmas)
    },
}
const mutations = {
    setDragState(state) {
        state.draggable = !state.draggable
    },
    setDragIng(state, parmas) {
        state.draging = parmas
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}