// 合作社   路由

// 合作社收入管理 
const Income = () => import('views/commune/home/Income')
const IncomeFreeList = () => import('views/commune/home/Major/IncomeFreeList')
const IncomeThirdList = () => import('views/commune/home/Major/IncomeThirdList')
const IncomeFreeDetail = () => import('views/commune/home/Major/IncomeFreeDetail')
const IncomeThirdDetail = () => import('views/commune/home/Major/IncomeThirdDetail')

// 合作社 用户管理 
const User = () => import('views/commune/home/User')
const ComList = () => import('views/commune/home/User/ComList')
const FreeList = () => import('views/commune/home/User/FreeList')
const InitList = () => import('views/commune/home/User/InitList')
const DetailAccount = () => import('views/commune/home/User/DetailAccount')
const DetailCompany = () => import('views/commune/home/User/DetailCompany')
const DetailContract = () => import('views/commune/home/User/DetailContract')

const DetailIndividual = () => import('views/commune/home/User/DetailIndividual')
const DetailPerson = () => import('views/commune/home/User/DetailPerson')

// 收入查询(自己)
const IncomeSelf = () => import('views/commune/home/Income')
const IncomeSelfList = () => import('views/commune/home/Income')
const IncomeSelfDetail = () => import('views/commune/home/Income')

// 个人中心
const Setting = () => import('views/commune/mine/Setting')
const ReviewPersonal = () => import('views/commune/mine/ReviewPersonal')
const ReviewContract = () => import('views/commune/mine/ReviewContract')
const EditPass = () => import('views/commune/mine/EditPass')


export default [
  {    // 合作社 收入================================================
    path: '/commune_income',
    component: Income
  },
  {
    path: '/commune_incomefreelist',
    component: IncomeFreeList
  },
  {
    path: '/commune_incomefreedetail',
    component: IncomeFreeDetail
  },
  {
    path: '/commune_incomethirdlist',
    component: IncomeThirdList
  },
  {
    path: '/commune_incomethirddetail',
    component: IncomeThirdDetail
  },

  {   // 合作社 管理用户============================================================
    path: '/commune_user',
    component: User,
  },
  {
    path: '/commune_comlist',
    component: ComList
  },
  {
    path: '/commune_freelist',
    component: FreeList
  },
  {
    path: '/commune_initlist',
    component: InitList
  },
  {
    path: '/commune_ud_company',
    component: DetailCompany
  },
  {
    path: '/commune_ud_account',
    component: DetailAccount
  },
  {
    path: '/commune_ud_contract',
    component: DetailContract
  },
  {
    path: '/commune_ud_person',
    component: DetailPerson
  },
  {
    path: '/commune_ud_individual',
    component: DetailIndividual
  },
  {   // 收入查询(自己======================
    path: '/commune_incomeself',
    component: IncomeSelf,
  },
  {
    path: '/commune_incomeselflist',
    component: IncomeSelfList,
  },
  {
    path: '/commune_incomeselfdetail',
    component: IncomeSelfDetail,
  },


  {
    path: '/commune_setting',   // 个人中心: 设置============================================
    component: Setting,
  },
  {
    path: '/commune_revpersonal',   // 个人中心: 的个人信息====
    component: ReviewPersonal,
  },
  {
    path: '/commune_revcontract',   // 个人中心: 协议信息====
    component: ReviewContract,
  },
  {
    path: '/commune_editpass',   // 个人中心: 修改密码====
    component: EditPass,
  },

]

