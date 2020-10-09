import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/vant.js'   // 引入vant 三方框架




// 导入全局函数===============================
import {clickLeft, checkMobile, checkPwd, checkUsername} from './common/utils'
import Qs from 'qs'
// 注册成为全局函数============================
Vue.prototype.clickLeft = clickLeft
Vue.prototype.checkMobile = checkMobile
Vue.prototype.checkPwd = checkPwd
Vue.prototype.checkUsername = checkUsername

Vue.prototype.$Qs = Qs
Vue.prototype.$axios = axios



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
