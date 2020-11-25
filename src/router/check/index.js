const List = () => import('views/check/home/List')
// 风控用户管理 路由
const User = () => import('views/check/home/User')
const UserList = () => import('views/check/home/UserList')
const DetailAccount = () => import('views/check/home/User/DetailAccount')
const DetailCompany = () => import('views/check/home/User/DetailCompany')
const DetailContract = () => import('views/check/home/User/DetailContract')
const DetailIndividual = () => import('views/check/home/User/DetailIndividual')
const DetailPerson = () => import('views/check/home/User/DetailPerson')

// 风控业务管理 路由
const Major = () => import('views/check/home/Major')


// 风控协议模板 路由
// 风控税收政策 路由
// 风控公司管理 路由
export default [
  {
    path: '/checkhome_user',
    component: User,
  },
  {
    path: '/checkhome_ulist',
    component: UserList
  },
  {
    path: '/checkhome_ud_company',
    component: DetailCompany
  },
  {
    path: '/checkhome_ud_account',
    component: DetailAccount
  },
  {
    path: '/checkhome_ud_contract',
    component: DetailContract
  },
  {
    path: '/checkhome_ud_person',
    component: DetailPerson
  },
  {
    path: '/checkhome_ud_individual',
    component: DetailIndividual
  },

  {
    path: '/checkhome_major',
    component: Major
  },

]

