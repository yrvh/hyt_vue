import Vue from 'vue'
import VueRouter from 'vue-router'

const CheckHome = () => import('views/check/home/Home')
const CheckMessage = () => import('views/check/message/Message')
const CheckMine = () => import('views/check/mine/Mine')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象===

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: CheckHome
  },
  {
    path: '/message',
    component: CheckMessage
  },
  {
    path: '/mine',
    component: CheckMine
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 3. 导出
export default router

