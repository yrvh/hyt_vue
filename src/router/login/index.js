// 登录和注册 功能的前端路由

// 登录注册模块
const Login = () => import('views/login/Login')
const Forget = () => import('views/login/Forget')
const SetPassword = () => import('views/login/SetPassword')
const Playform = () => import('views/login/Platform')
const ChooseIdent = () => import('views/login/ChooseIdent')
const UpIdcard = () => import('views/login/UpIdcard')

// 业者注册模块
const ChooseFree = () => import('views/login/free/ChooseFree')
const RegFreecom = () => import('views/login/free/RegFreecom')
const RegFree = () => import('views/login/free/RegFree')
const RegSecretary = () => import('views/login/free/RegSecretary')
const RegPersonal = () => import('views/login/free/RegPersonal')

// 合作伙伴注册模块
const ChooseCoop = () => import('views/login/coop/ChooseCoop')

// 用户确认信息模块
const Audit = () => import('views/login/audit/Audit')
const CfmPersonal = () => import('views/login/audit/CfmPersonal')
const CfmIndividual = () => import('views/login/audit/CfmIndividual')
const CfmIncome = () => import('views/login/audit/CfmIncome')
const CfmContract = () => import('views/login/audit/CfmContract')

export default [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/forget',
    component: Forget
  },
  {
    path: '/setpassword',
    component: SetPassword
  },
  {
    path: '/platform',
    component: Playform
  },
  {
    path: '/choose_ident',
    component: ChooseIdent
  },
  {
    path: '/choose_free',
    component: ChooseFree
  },
  {
    path: '/choose_coop',
    component: ChooseCoop
  },
  {
    path: '/regfreecom',
    component: RegFreecom
  },
  {
    path: '/regfree',
    component: RegFree
  },
  {
    path: '/reg_secretary',
    component: RegSecretary
  },
  {
    path: '/reg_personal',
    component: RegPersonal
  },
  {
    path: '/upidcard',
    component: UpIdcard
  },
  {
    path: '/audit',
    component: Audit
  },
  {
    path: '/cfm_personal',
    component: CfmPersonal
  },
  {
    path: '/cfm_individual',
    component: CfmIndividual
  },
  {
    path: '/cfm_income',
    component: CfmIncome
  },
  {
    path: '/cfm_contract',
    component: CfmContract
  },
]

