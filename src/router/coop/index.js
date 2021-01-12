// 合伙个人:  路由
// 用户管理
const User = () => import('views/coop/home/User')
const UserComList = () => import('views/coop/home/User/UserComList')
const UserFreeList = () => import('views/coop/home/User/UserFreeList')
const UserInitList = () => import('views/coop/home/User/UserInitList')
const DetailAccount = () => import('views/coop/home/User/DetailAccount')
const DetailCompany = () => import('views/coop/home/User/DetailCompany')
const DetailContract = () => import('views/coop/home/User/DetailContract')

const DetailIndividual = () => import('views/coop/home/User/DetailIndividual')
const DetailPerson = () => import('views/coop/home/User/DetailPerson')
// 收入管理
const Income = () => import('views/coop/home/Income')
const IncomeList = () => import('views/coop/home/Major/IncomeList')
const IncomeDetail = () => import('views/coop/home/Major/IncomeDetail')

// 收入查询(自己
const IncomeSelf = () => import('views/coop/home/IncomeSelf')
const IncomeSelfList = () => import('views/coop/home/Major/IncomeSelfList')
const IncomeSelfDetail = () => import('views/coop/home/Major/IncomeSelfDetail')

// 发票查询
const Invoice = () => import('views/coop/home/Invoice')
const InvoiceList = () => import('views/coop/home/Major/InvoiceList')
const InvoiceDetail = () => import('views/coop/home/Major/InvoiceDetail')
// 报税查询
const Tax = () => import('views/coop/home/Tax')
const TaxList = () => import('views/coop/home/Major/Tax')
const TaxDetail = () => import('views/coop/home/Major/Tax')

// 个人中心
const Setting = () => import('views/coop/mine/Setting')
const ReviewPersonal = () => import('views/coop/mine/ReviewPersonal')
const ReviewContract = () => import('views/coop/mine/ReviewContract')
const EditPass = () => import('views/coop/mine/EditPass')

export default [
  {   // 收入管理===================
    path: '/coop_income',
    component: Income,
  },
  {
    path: '/coop_incomelist',
    component: IncomeList,
  },
  {
    path: '/coop_incomedetail',
    component: IncomeDetail,
  },
  {   // 用户管里=====================
    path: '/coop_User',
    component: User,
  },
  {
    path: '/coop_usercomlist',
    component: UserComList,
  },
  {
    path: '/coop_userfreelist',
    component: UserFreeList,
  },
  {
    path: '/coop_userinitlist',
    component: UserInitList,
  },
  {
    path: '/coop_ud_company',
    component: DetailCompany
  },
  {
    path: '/coop_ud_account',
    component: DetailAccount
  },
  {
    path: '/coop_ud_contract',
    component: DetailContract
  },
  {
    path: '/coop_ud_person',
    component: DetailPerson
  },
  {
    path: '/coop_ud_individual',
    component: DetailIndividual
  },

  {   // 收入查询(自己======================
    path: '/coop_incomeself',
    component: IncomeSelf,
  },
  {
    path: '/coop_incomeselflist',
    component: IncomeSelfList,
  },
  {
    path: '/coop_incomeselfdetail',
    component: IncomeSelfDetail,
  },

  {   // 发票查询(自己===========================
    path: '/coop_invoice',
    component: Invoice,
  },
  {
    path: '/coop_invoicelist',
    component: InvoiceList,
  },
  {
    path: '/coop_invoicedetail',
    component: InvoiceDetail,
  },
  
  
  {   // 报税查询(自己=====================
    path: '/coop_tax',
    component: Tax,
  },
  {
    path: '/coop_taxlist',
    component: TaxList,
  },
  {
    path: '/coop_taxdetail',
    component: TaxDetail,
  },
]
