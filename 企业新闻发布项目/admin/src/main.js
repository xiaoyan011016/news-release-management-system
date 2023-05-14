import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入elepment-plus库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入粒子效果库
import VueParticles from 'vue-particles'
// 导入axios拦截器
import '@/util/axios.config.js'

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .use(VueParticles)
  .mount('#app')
