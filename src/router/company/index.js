const List = () => import('views/check/home/List')
// 单位角色:  路由
const User = () => import('views/company/home/User')
const Income = () => import('views/company/home/Income')

export default [
  {
    path: '/companyhome_user',
    component: User,
  },
  {
    path: '/companyhome_income',
    component: Income,
  },


]

