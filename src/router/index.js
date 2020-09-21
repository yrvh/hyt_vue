import Vue from 'vue'
import VueRouter from 'vue-router'

import login from  './login'
import check from './check'



// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象==============
const routes = [
  {
    path: '*',   // 当路由没有匹配的组件时,  则跳转到login页面
    redirect: '/login'
  },
  {
    path: '/main',
    component: () => import('views/Main'),
    children: [
      {
        path: '',
        redirect: 'checkhome'   // 当main后边无输入内容的时候, 默认跳转到 风控的首页
      },
      ...check
    ]
  },
  ...login,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 3. 导出
export default router

