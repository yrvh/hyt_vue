// 风控用户管理 路由
const User = () => import('views/check/home/User')
const ComList = () => import('views/check/home/User/ComList')
const FreeList = () => import('views/check/home/User/FreeList')
const CoopList = () => import('views/check/home/User/CoopList')
const CoopcomList = () => import('views/check/home/User/CoopcomList')
const FrontierList = () => import('views/check/home/User/FrontierList')
const RelationList = () => import('views/check/home/User/RelationList')

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
    path: '/check_user',
    component: User,
  },
  {
    path: '/check_comlist',
    component: ComList
  },
  {
    path: '/check_freelist',
    component: FreeList
  },
  {
    path: '/check_cooplist',
    component: CoopList
  },
  {
    path: '/check_coopcomlist',
    component: CoopcomList
  },
  {
    path: '/check_frontierlist',
    component: FrontierList
  },
  {
    path: '/check_relationlist',
    component: RelationList
  },


  {
    path: '/check_ud_company',
    component: DetailCompany
  },
  {
    path: '/check_ud_account',
    component: DetailAccount
  },
  {
    path: '/check_ud_contract',
    component: DetailContract
  },
  {
    path: '/check_ud_person',
    component: DetailPerson
  },
  {
    path: '/check_ud_individual',
    component: DetailIndividual
  },

  {
    path: '/check_major',
    component: Major
  },

]

