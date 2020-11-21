// 无业者: 收入管理 路由
const Income = () => import('views/free/home/Income')
const IncomeList = () => import('views/free/home/IncomeList')
const IncomeDetail = () => import('views/free/home/IncomeDetail')
const IncomeAdd = () => import('views/free/home/IncomeAdd')
const DealList = () => import('views/free/home/DealList')
const DealDetail = () => import('views/free/home/DealDetail')
const DealAdd = () => import('views/free/home/DealAdd')
const CapList = () => import('views/free/home/CapList')
const CapDetail = () => import('views/free/home/CapDetail')
const CapAdd = () => import('views/free/home/CapAdd')

const Invoice = () => import('views/free/home/Invoice')
const InvoiceList = () => import('views/free/home/InvoiceList')
const InvoiceDetail = () => import('views/free/home/InvoiceDetail')
const TaxList = () => import('views/free/home/TaxList')

const Setting = () => import('views/free/mine/Setting')
const ReviewPersonal = () => import('views/free/mine/ReviewPersonal')
const ReviewContract = () => import('views/free/mine/ReviewContract')
const EditPass = () => import('views/free/mine/EditPass')


export default [
  {
    path: '/free_income',   // 收入管理主界面 路由============================
    component: Income,
  },  
  {
    path: '/free_incomelist',   // 收入管理列表页
    component: IncomeList,
  },
  {
    path: '/free_incomedetail',   // 收入管理详情页
    component: IncomeDetail,
  },
  {
    path: '/free_incomeadd',      // 新增收入管理
    component: IncomeAdd,
  },

  {
    path: '/free_deallist',      // 业务合同列表页=========
    component: DealList,
  },
  {
    path: '/free_dealdetail',      // 业务合同详情页
    component: DealDetail,
  },
  {
    path: '/free_dealadd',      // 新增业务合同
    component: DealAdd,
  },

  {
    path: '/free_caplist',      // 抬头管理列表页=========
    component: CapList,
  },
  {
    path: '/free_capdetail',      // 抬头管理详情页
    component: CapDetail,
  },
  {
    path: '/free_capadd',      // 新增抬头
    component: CapAdd,
  },



  {
    path: '/free_invoice',   // 发票查询主界面 路由============================
    component: Invoice,
  },
  {
    path: '/free_invoicelist',   // 发票查询列表页页
    component: InvoiceList,
  },
  {
    path: '/free_invoicedetail',   // 发票查询详情页
    component: InvoiceDetail,
  },

  {
    path: '/free_taxlist',   // 报税查询列表页============================================
    component: TaxList,
  },
  

  {
    path: '/free_setting',   // 个人中心: 设置============================================
    component: Setting,
  },
  {
    path: '/free_revpersonal',   // 个人中心: 的个人信息====
    component: ReviewPersonal,
  },
  {
    path: '/free_revcontract',   // 个人中心: 协议信息====
    component: ReviewContract,
  },
  {
    path: '/free_editpass',   // 个人中心: 修改密码====
    component: EditPass,
  },

]

