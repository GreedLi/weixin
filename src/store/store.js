import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import state from './state'
import actions from './actions'
import getters from './getter'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})