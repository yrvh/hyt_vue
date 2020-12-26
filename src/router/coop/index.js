
// 合伙个人:  路由
const Income = () => import('views/coop/home/Income')
const IncomeSelf = () => import('views/coop/home/IncomeSelf')
const User = () => import('views/coop/home/User')
const Invoice = () => import('views/coop/home/Invoice')
const Tax = () => import('views/coop/home/Tax')

const IncomeList = () => import('views/coop/home/Major/IncomeList')
const UserList = () => import('views/coop/home/Major/IncomeList')
const IncomeSelfList = () => import('views/coop/home/Major/IncomeList')
const InvoiceList = () => import('views/coop/home/Major/IncomeList')
const TaxList = () => import('views/coop/home/Major/IncomeList')

export default [
  {
    path: '/coop_income',
    component: Income,
  },
  {
    path: '/coop_invoice',
    component: Invoice,
  },
  {
    path: '/coop_User',
    component: User,
  },
  {
    path: '/coop_incomeself',
    component: IncomeSelf,
  },
  {
    path: '/coop_tax',
    component: Tax,
  },

  {
    path: '/coop_incomelist',
    component: IncomeList,
  },
  {
    path: '/coop_userlist',
    component: UserList,
  },
  {
    path: '/coop_incomeselflist',
    component: IncomeSelfList,
  },
  {
    path: '/coop_invoicelist',
    component: InvoiceList,
  },
  {
    path: '/coop_taxlist',
    component: TaxList,
  }
]
