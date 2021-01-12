// 合作社   路由

// 合作社 用户管理 
const User = () => import('views/commune/home/User')
const UserList = () => import('views/commune/home/User/UserList')
const DetailAccount = () => import('views/commune/home/User/DetailAccount')
const DetailCompany = () => import('views/commune/home/User/DetailCompany')
const DetailContract = () => import('views/commune/home/User/DetailContract')

const DetailIndividual = () => import('views/commune/home/User/DetailIndividual')
const DetailPerson = () => import('views/commune/home/User/DetailPerson')

// 合作社 购货信息管理
const Shop = () => import('views/commune/home/Shop')
const ShopList = () => import('views/commune/home/Major/ShopList')
const ShopDetail = () => import('views/commune/home/Major/ShopDetail')

// 发票抬头管理
const Cap = () => import('views/commune/home/CapList')
const CapList = () => import('views/commune/home/Major/CapList')
const CapDetail = () => import('views/commune/home/Major/CapDetail')
const CapAdd = () => import('views/commune/home/Major/CapAdd')

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
  {   // 合作社 管理用户============================================================
    path: '/commune_user',
    component: User,
  },
  {
    path: '/commune_userlist',
    component: UserList
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

  {   // 购货信息管理=========================
    path: '/commune_shop',
    component: Shop
  },
  {
    path: '/commune_shoplist',
    component: ShopList
  },
  {
    path: '/commune_shopdetail',
    component: ShopDetail
  },

  {   // 发票抬头管理=========================
    path: '/commune_cap',
    component: Cap
  },
  {
    path: '/commune_caplist',
    component: CapList
  },
  {
    path: '/commune_capdetail',
    component: CapDetail
  },
  {
    path: '/commune_capadd',
    component: CapAdd
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

