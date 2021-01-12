// 单位角色:  路由

// 业务人员管理==========
const User = () => import('views/company/home/User')
const RegisterList = () => import('views/company/home/User/RegisterList')
const ServeList = () => import('views/company/home/User/ServeList')
const RegisterDetail = () => import('views/company/home/User/RegisterDetail')
const ServeDetail = () => import('views/company/home/User/ServeDetail')

// 支付管理========================
const Income = () => import('views/company/home/Income')
const AlreadyList = () => import('views/company/home/Major/AlreadyList')
const WaitList = () => import('views/company/home/Major/WaitList')
const AlreadyDetail = () => import('views/company/home/Major/AlreadyDetail')
const WaitDetail = () => import('views/company/home/Major/WaitDetail')

// 业务合同设置==========================
const DealList = () => import('views/company/home/Major/DealList')
const DealDetail = () => import('views/company/home/Major/DealDetail')

export default [
  // 业务人员管理========================
  {
    path: '/company_user',
    component: User,
  },
  {
    path: '/company_registerlist',
    component: RegisterList,
  },
  {
    path: '/company_servelist',
    component: ServeList,
  },
  {
    path: '/company_registerdetail',
    component: RegisterDetail,
  },
  {
    path: '/company_servedetail',
    component: ServeDetail,
  },

  // 支付管理 ========================
  
  {
    path: '/company_income',
    component: Income,
  },
  {
    path: '/company_alreadylist',
    component: AlreadyList,
  },
  {
    path: '/company_waitlist',
    component: WaitList,
  },
  {
    path: '/company_alreadydetail',
    component: AlreadyDetail,
  },
  {
    path: '/company_waitdetail',
    component: WaitDetail,
  },

  // 业务合同设置========================
  {
    path: '/company_deallist',
    component: DealList,
  },
  {
    path: '/company_dealdetail',
    component: DealDetail,
  },
]

