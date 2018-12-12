import {
  USER_LOGINID,
  GET_ROUTER,
  SET_ROLE,
  IS_LOGIN,
  MSG_DETAIL
} from './mutation-types.js'

export default {
  // 记录当前经度纬度
  [USER_LOGINID](state,
    loginId
  ) {
    state.loginId = loginId;
  },
  [GET_ROUTER](state, router) {
    state.router = router
  },
  [SET_ROLE](state, role) {
    state.role = role
  },
  [IS_LOGIN](state, login) {
    state.login = login
  },
  [MSG_DETAIL](state, detail) {
    state.msgDetail = detail
  }
}
