import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    // 共享的数据,判断所有路由是否添加上
    isGetAllRoutes: false,
    // 默认为false，即不折叠
    isCollapse: false,
    // 存放用户信息
    userInfo: {}
  },
  getters: {
  },
  mutations: {
    // 因为不经过ajax请求，所以直接使用commit方法
    changeGetAllRoute(state, value) {
      state.isGetAllRoutes = value
    },
    changeCollapse(state) {
      // 每次调用该方法的时候取反即可
      state.isCollapse = !state.isCollapse
    },
    addUserInfo(state, value) {
      // 为了旧值不更新的情况和新值进行合并
      state.userInfo = { ...state.userInfo, ...value }
    },
    clearUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths: ["isCollapse", "userInfo"] //控制哪些属性是否持久化
  })],
})
