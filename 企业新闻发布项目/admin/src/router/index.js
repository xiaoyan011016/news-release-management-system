import { createRouter, createWebHashHistory } from 'vue-router'
// 导入路由匹配组件
import Login from '@/views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import MyConfigRoutes from './config.js'
import store from '../store/index.js'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'MainBox',
      path: '/mainbox',
      component: MainBox
    }
  ]
})

// 配置路由拦截
router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    // 登录页面直接放行
    next()
  } else {
    if (!(localStorage.getItem('token'))) {
      // 没有token，直接重定向到登录页
      next('/login')
    } else {
      if (!store.state.isGetAllRoutes) {
        // 每次进入删除旧的路径,父路径删除子路径也没了
        router.removeRoute('MainBox')
        MyConfigRoutesApi() //封装了addRoute动态添加路由的方法
        next({
          path: to.fullPath
        })
      } else {
        next()
      }
    }
  }
})

const MyConfigRoutesApi = () => MyConfigRoutes.forEach(item => {
  // 清空旧的MainBox路径，创建新的
  if (!router.hasRoute('MainBox')) {
    router.addRoute({
      name: 'MainBox',
      path: '/mainbox',
      component: MainBox
    })
  }
  // 每次进入路由，都进行判断是不是管理员
  checkPermission(item) && router.addRoute('MainBox', item)
  store.commit("changeGetAllRoute", true)
})

const checkPermission = (item) => {
  if (item.meta?.isAuth) {
    return store.state.userInfo.role === 1 //管理员直接放行
  }
  // 不需要校验直接放行,非user-manage开头的路径不需要进行验证
  return true
}

export default router
