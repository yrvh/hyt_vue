import Vue from 'vue'
import VueRouter from 'vue-router'

import login from  './login'

import main from './main'
import check from './check'
import manager from './manager'
import free from './free'
import freecom from './freecom'
import coop from './coop'
import coopcom from './coopcom'
import company from './company'




// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象==============
const routes = [
  {
    path: '*',   // 当路由没有匹配的组件时,  则跳转到login页面
    redirect: '/login'
  },
  ...login,
  main,
  ...check,
  ...manager,
  ...free,
  ...freecom,
  ...coop,
  ...coopcom,
  ...company,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 3. 导出
export default router

