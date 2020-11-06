// 有业者: 收入管理 路由
const Income = () => import('views/freecom/home/Income')
const Invoice = () => import('views/freecom/home/Invoice')
const Serve = () => import('views/freecom/home/Serve')

const List = () => import('views/freecom/home/List')
export default [
  {
    path: '/freecomhome_income',
    component: Income,
  },
  {
    path: '/freecomhome_invoice',
    component: Invoice,
  },
  {
    path: '/freecom_list',
    component: List,
  },

]

