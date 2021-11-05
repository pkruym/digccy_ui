import {
    SocketAPI
} from "@/assets/js/WsApi2";


const state = {

}

const getters = {


}

const actions = {



    /**
     * 获取跟单列表
     * @param {*} param0 
     */
    query_pages({
        commit
    }, arg) {
        return SocketAPI.request("/user_follower/query_pages", arg);
    },


     /**
     * 跟单新增修改
     * @param {*} param0 
     */
    update_set({
        commit
    }, arg) {
        return SocketAPI.request("/user_follower/update_set", arg);
    },
}
const mutations = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}