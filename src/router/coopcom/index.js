
const List = () => import('views/check/home/List')
// 合伙企业:  路由
const Income = () => import('views/coop/home/Income')
const Invoice = () => import('views/coop/home/Invoice')
const User = () => import('views/coop/home/User')
export default [
  {
    path: '/coopcomhome_income',
    component: Income,
  },
  {
    path: '/coopcomhome_invoice',
    component: Invoice,
  },
  {
    path: '/coopcomhome_User',
    component: User,
  }
]
