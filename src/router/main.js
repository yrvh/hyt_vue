// 所有 有tabbar的页面路由


const CheckHome = () => import('views/check/home/Home')
const CheckMessage = () => import('views/check/message/Message')
const CheckMine = () => import('views/check/mine/Mine')

const FreeHome = () => import('views/free/home/Home')
const FreeMessage = () => import('views/free/message/Message')
const FreeMine = () => import('views/free/mine/Mine')

const FreecomHome = () => import('views/freecom/home/Home')
const FreecomMessage = () => import('views/freecom/message/Message')
const FreecomMine = () => import('views/freecom/mine/Mine')

const CoopHome = () => import('views/coop/home/Home')
const CoopMessage = () => import('views/coop/message/Message')
const CoopMine = () => import('views/coop/mine/Mine')

const CoopcomHome = () => import('views/coopcom/home/Home')
const CoopcomMessage = () => import('views/coopcom/message/Message')
const CoopcomMine = () => import('views/coopcom/mine/Mine')

const CompanyHome = () => import('views/company/home/Home')
const CompanyMessage = () => import('views/company/message/Message')
const CompanyMine = () => import('views/company/mine/Mine')

const ManagerHome = () => import('views/manager/home/Home')
const ManagerMessage = () => import('views/manager/message/Message')
const ManagerMine = () => import('views/manager/mine/Mine')

export default {
  path: '/main',
  component: () => import('views/Main'),
  children: [
    {
      path: '',
      redirect: '/login'   // 当main后边无输入内容的时候, 默认跳转到 登录页
    },
    {
      path: 'checkhome',   // 风控首页
      component: CheckHome
    },
    {
      path: 'checkmessage',
      component: CheckMessage
    },
    {
      path: 'checkmine',
      component: CheckMine
    },

    {
      path: 'freehome',    // 无单位业者
      component: FreeHome
    },
    {
      path: 'freemessage',
      component: FreeMessage
    },
    {
      path: 'freemine',
      component: FreeMine
    },
    {
      path: 'freecomhome',   // 有单位业者
      component: FreecomHome
    },
    {
      path: 'freecommessage',
      component: FreecomMessage
    },
    {
      path: 'freecommine',
      component: FreecomMine
    },

    {
      path: 'coophome',   // 合伙个人
      component: CoopHome
    },
    {
      path: 'coopmessage',
      component: CoopMessage
    },
    {
      path: 'coopmine',
      component: CoopMine
    },
    {
      path: 'coopcomhome',   // 合伙单位
      component: CoopcomHome
    },
    {
      path: 'coopcommessage',
      component: CoopcomMessage
    },
    {
      path: 'coopcommine',
      component: CoopcomMine
    },

    {
      path: 'companyhome',   // 单位
      component: CompanyHome
    },
    {
      path: 'companymessage',
      component: CompanyMessage
    },
    {
      path: 'companymine',
      component: CompanyMine
    },
    {
      path: 'managerhome',   // 法人
      component: ManagerHome
    },
    {
      path: 'managermessage',
      component: ManagerMessage
    },
    {
      path: 'managermine',
      component: ManagerMine
    },
  ]
}
