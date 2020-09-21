// 风控的路由

const Home = () => import('views/check/home/Home')
const Message = () => import('views/check/message/Message')
const Mine = () => import('views/check/mine/Mine')

// 风控用户管理 路由
const User = () => import('views/check/home/User/User')
const List = () => import('views/check/home/User/List')
const DetailAccount = () => import('views/check/home/User/DetailAccount')
const DetailCompany = () => import('views/check/home/User/DetailCompany')
const DetailContract = () => import('views/check/home/User/DetailContract')
const DetailIncome = () => import('views/check/home/User/DetailIncome')
const DetailIndividual = () => import('views/check/home/User/DetailIndividual')
const DetailPerson = () => import('views/check/home/User/DetailPerson')


const Company = () => import('views/check/cpns/Company')
const Free = () => import('views/check/cpns/Free')
const Coop = () => import('views/check/cpns/Coop')
// 风控业务管理 路由
// 风控协议模板 路由
// 风控税收政策 路由
// 风控公司管理 路由
export default [
  {
    path: 'checkhome',
    component: Home
  },
  {
    path: 'checkmessage',
    component: Message
  },
  {
    path: 'checkmine',
    component: Mine
  },
  {
    path: 'checkhome_user',
    component: User,
    children: [
      // {
      //   path: '',
      //   redirect: 'company'
      // },
      {
        path: 'company',
        component: Company
      },
      {
        path: 'free',
        component: Free
      },
      {
        path: 'coop',
        component: Coop
      },
    ]
  },
  {
    path: 'checkhome_userlist',
    component: List
  },
  {
    path: 'checkhome_userdetail_account',
    component: DetailAccount
  },
  {
    path: 'checkhome_userdetail_company',
    component: DetailCompany
  },
  {
    path: 'checkhome_userdetail_contract',
    component: DetailContract
  },
  {
    path: 'checkhome_userdetail_income',
    component: DetailIncome
  },
  {
    path: 'checkhome_userdetail_individual',
    component: DetailIndividual
  },
  {
    path: 'checkhome_userdetail_person',
    component: DetailPerson
  }
]

