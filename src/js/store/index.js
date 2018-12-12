import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  loginId: null, //当前用户的ID
  router: {}, //当前的路由信息
  role: null, //保存当前用户的权限
  login: false,
  msgDetail: {}
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
