// 合伙单位:  路由

// 收入管理
const Income = () => import('views/coopcom/home/Income')
const IncomeFreeList = () => import('views/coopcom/home/Major/IncomeFreeList')
const IncomeFreeDetail = () => import('views/coopcom/home/Major/IncomeFreeDetail')
const IncomeThirdList = () => import('views/coopcom/home/Major/IncomeThirdList')
const IncomeThirdDetail = () => import('views/coopcom/home/Major/IncomeThirdDetail')

// 用户管理
const User = () => import('views/coopcom/home/User')
const ComList = () => import('views/coopcom/home/User/ComList')
const FreeList = () => import('views/coopcom/home/User/FreeList')
const InitList = () => import('views/coopcom/home/User/InitList')
const DetailAccount = () => import('views/coopcom/home/User/DetailAccount')
const DetailCompany = () => import('views/coopcom/home/User/DetailCompany')
const DetailContract = () => import('views/coopcom/home/User/DetailContract')

const DetailIndividual = () => import('views/coopcom/home/User/DetailIndividual')
const DetailPerson = () => import('views/coopcom/home/User/DetailPerson')

// 收入查询(自己
const IncomeSelf = () => import('views/coopcom/home/IncomeSelf')
const IncomeSelfList = () => import('views/coopcom/home/Major/IncomeSelfList')
const IncomeSelfDetail = () => import('views/coopcom/home/Major/IncomeSelfDetail')

// 个人中心
const Setting = () => import('views/coopcom/mine/Setting')
const ReviewPersonal = () => import('views/coopcom/mine/ReviewPersonal')
const ReviewContract = () => import('views/coopcom/mine/ReviewContract')
const EditPass = () => import('views/coopcom/mine/EditPass')

export default [
  {   // 收入管理===================
    path: '/coopcom_income',
    component: Income,
  },
  {
    path: '/coopcom_incomefreelist',
    component: IncomeFreeList,
  },
  {
    path: '/coopcom_incomefreedetail',
    component: IncomeFreeDetail,
  },
  {
    path: '/coopcom_incomethirdlist',
    component: IncomeThirdList,
  },
  {
    path: '/coopcom_incomethirddetail',
    component: IncomeThirdDetail,
  },
  
  {   // 用户管里=====================
    path: '/coopcom_User',
    component: User,
  },
  {
    path: '/coopcom_usercomlist',
    component: ComList,
  },
  {
    path: '/coopcom_userfreelist',
    component: FreeList,
  },
  {
    path: '/coopcom_userinitlist',
    component: InitList,
  },
  {
    path: '/coopcom_ud_company',
    component: DetailCompany
  },
  {
    path: '/coopcom_ud_account',
    component: DetailAccount
  },
  {
    path: '/coopcom_ud_contract',
    component: DetailContract
  },
  {
    path: '/coopcom_ud_person',
    component: DetailPerson
  },
  {
    path: '/coopcom_ud_individual',
    component: DetailIndividual
  },

  {   // 收入查询(自己======================
    path: '/coopcom_incomeself',
    component: IncomeSelf,
  },
  {
    path: '/coopcom_incomeselflist',
    component: IncomeSelfList,
  },
  {
    path: '/coopcom_incomeselfdetail',
    component: IncomeSelfDetail,
  },


  {
    path: '/coopcom_setting',   // 个人中心: 设置============================================
    component: Setting,
  },
  {
    path: '/coopcom_revpersonal',   // 个人中心: 的个人信息====
    component: ReviewPersonal,
  },
  {
    path: '/coopcom_revcontract',   // 个人中心: 协议信息====
    component: ReviewContract,
  },
  {
    path: '/coopcom_editpass',   // 个人中心: 修改密码====
    component: EditPass,
  },
  
]
