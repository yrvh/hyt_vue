const List = () => import('views/check/home/List')
// 无业者: 收入管理 路由
const Income = () => import('views/free/home/Income')
const Invoice = () => import('views/free/home/Invoice')
export default [
  {
    path: '/freehome_income',
    component: Income,
  },
  {
    path: '/freehome_invoice',
    component: Invoice,
  },

]
