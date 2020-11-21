// 有业者: 收入管理 路由
const Income = () => import('views/freecom/home/Income')
const IncomeList = () => import('views/freecom/home/IncomeList')
const IncomeDetail = () => import('views/freecom/home/IncomeDetail')
const DealList = () => import('views/freecom/home/DealList')
const DealDetail = () => import('views/freecom/home/DealDetail')

const Invoice = () => import('views/freecom/home/Invoice')
const InvoiceList = () => import('views/freecom/home/InvoiceList')
const InvoiceDetail = () => import('views/freecom/home/InvoiceDetail')

const TaxList = () => import('views/freecom/home/TaxList')

const Serve = () => import('views/freecom/home/Serve')
const ServeList = () => import('views/freecom/home/ServeList')
const ServeDetail = () => import('views/freecom/home/ServeDetail')

const RunningList = () => import('views/freecom/home/RunningList')
const RunningDetail = () => import('views/freecom/home/RunningDetail')

const Setting = () => import('views/freecom/mine/Setting')
const ReviewPersonal = () => import('views/freecom/mine/ReviewPersonal')
const ReviewContract = () => import('views/freecom/mine/ReviewContract')
const EditPass = () => import('views/freecom/mine/EditPass')

export default [
  {
    path: '/freecom_income',   // 收入管理主界面 路由============================
    component: Income,
  },  
  {
    path: '/freecom_incomelist',   // 收入管理列表页页
    component: IncomeList,
  },
  {
    path: '/freecom_incomedetail',   // 收入管理详情页
    component: IncomeDetail,
  },

  {
    path: '/freecom_deallist',      // 业务合同列表页
    component: DealList,
  },
  {
    path: '/freecom_dealdetail',      // 业务合同详情页
    component: DealDetail,
  },


  {
    path: '/freecom_invoice',   // 发票查询主界面 路由============================
    component: Invoice,
  },
  {
    path: '/freecom_invoicelist',   // 发票查询列表页页
    component: InvoiceList,
  },
  {
    path: '/freecom_invoicedetail',   // 发票查询详情页
    component: InvoiceDetail,
  },

  {
    path: '/freecom_taxlist',   // 报税查询列表页============================================
    component: TaxList,
  },
  
  {
    path: '/freecom_serve',   // 添加公司主界面 路由======================================
    component: Serve,
  },
  {
    path: '/freecom_servelist',   // 添加公司列表页
    component: ServeList,
  },
  {
    path: '/freecom_servedetail',   // 添加公司详情页
    component: ServeDetail,
  },

  {
    path: '/freecom_runninglist',   // 服务追中的公司 列表页
    component: RunningList,
  },
  {
    path: '/freecom_runningdetail',   // 服务中的公司 详情页
    component: RunningDetail,
  },


  {
    path: '/freecom_setting',   // 个人中心: 设置============================================
    component: Setting,
  },
  {
    path: '/freecom_revpersonal',   // 个人中心: 的个人信息====
    component: ReviewPersonal,
  },
  {
    path: '/freecom_revcontract',   // 个人中心: 协议信息====
    component: ReviewContract,
  },
  {
    path: '/freecom_editpass',   // 个人中心: 修改密码====
    component: EditPass,
  },
]

