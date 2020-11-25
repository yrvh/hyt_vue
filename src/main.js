import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/vant.js'   // 引入vant 三方框架




// 导入全局函数===============================
import {clickLeft, checkMobile, checkPwd, checkUsername, checkRealname,
        checkEmail, checkIdcard, checkBank, checkComname, checkTaxcode,
        checkFixed, checkAddress, checkDeal} from './common/utils'
import Qs from 'qs'
// 注册成为全局函数============================
Vue.prototype.clickLeft = clickLeft
Vue.prototype.checkMobile = checkMobile
Vue.prototype.checkPwd = checkPwd
Vue.prototype.checkUsername = checkUsername
Vue.prototype.checkRealname = checkRealname
Vue.prototype.checkEmail  = checkEmail
Vue.prototype.checkIdcard  = checkIdcard
Vue.prototype.checkBank  = checkBank
Vue.prototype.checkComname  = checkComname
Vue.prototype.checkTaxcode = checkTaxcode
Vue.prototype.checkFixed = checkFixed
Vue.prototype.checkAddress = checkAddress
Vue.prototype.checkDeal = checkDeal

Vue.prototype.$Qs = Qs
Vue.prototype.$axios = axios

// 导入自定义的全局组件=============================================================
import Expect from "components/content/Expect/Expect";
// 注册为全局组件==========
Vue.component('Expect',Expect)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
