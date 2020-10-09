// 风控的路由


// 风控用户管理 路由
const User = () => import('views/check/home/User/User')
const List = () => import('views/check/home/User/List')
const DetailAccount = () => import('views/check/home/User/DetailAccount')
const DetailCompany = () => import('views/check/home/User/DetailCompany')
const DetailContract = () => import('views/check/home/User/DetailContract')
const DetailIncome = () => import('views/check/home/User/DetailIncome')
const DetailIndividual = () => import('views/check/home/User/DetailIndividual')
const DetailPerson = () => import('views/check/home/User/DetailPerson')

// 风控业务管理 路由
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
    component: List
  },
  {
    path: '/checkhome_ud_account',
    component: DetailAccount
  },
  {
    path: '/checkhome_ud_company',
    component: DetailCompany
  },
  {
    path: '/checkhome_ud_contract',
    component: DetailContract
  },
  {
    path: '/checkhome_ud_income',
    component: DetailIncome
  },
  {
    path: '/checkhome_ud_individual',
    component: DetailIndividual
  },
  {
    path: '/checkhome_ud_person',
    component: DetailPerson
  }
]

