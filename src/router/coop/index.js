
const List = () => import('views/check/home/List')
// 合伙个人:  路由
const Income = () => import('views/coop/home/Income')
const IncomeSelf = () => import('views/coop/home/IncomeSelf')
const User = () => import('views/coop/home/User')
const Invoice = () => import('views/coop/home/Invoice')

export default [
  {
    path: '/coophome_income',
    component: Income,
  },
  {
    path: '/coophome_invoice',
    component: Invoice,
  },
  {
    path: '/coophome_User',
    component: User,
  },
  {
    path: '/coophome_incomeself',
    component: IncomeSelf,
  }
]
