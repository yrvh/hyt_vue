// 风控用户管理 路由
const User = () => import('views/check/home/User')
const ComList = () => import('views/check/home/User/ComList')
const FreeList = () => import('views/check/home/User/FreeList')
const CoopList = () => import('views/check/home/User/CoopList')
const CoopcomList = () => import('views/check/home/User/CoopcomList')
const FrontierList = () => import('views/check/home/User/FrontierList')
const ThirdList = () => import('views/check/home/User/ThirdList')
const RelationList = () => import('views/check/home/User/RelationList')

const DetailAccount = () => import('views/check/home/User/DetailAccount')
const DetailCompany = () => import('views/check/home/User/DetailCompany')
const DetailContract = () => import('views/check/home/User/DetailContract')

const DetailIndividual = () => import('views/check/home/User/DetailIndividual')
const DetailPerson = () => import('views/check/home/User/DetailPerson')

const DetailRelation = () => import('views/check/home/User/DetailRelation')

// 风控收入管理 路由
const Income = () => import('views/check/home/Income')
const IncomeFreeList = () => import('views/check/home/Major/IncomeFreeList')
const IncomeCoopList = () => import('views/check/home/Major/IncomeCoopList')
const IncomeFrontierList = () => import('views/check/home/Major/IncomeFrontierList')
const IncomeThirdList = () => import('views/check/home/Major/IncomeThirdList')
const IncomeFreeDetail = () => import('views/check/home/Major/IncomeFreeDetail')
const IncomeCoopDetail = () => import('views/check/home/Major/IncomeCoopDetail')
const IncomeFrontierDetail = () => import('views/check/home/Major/IncomeFrontierDetail')
const IncomeThirdDetail = () => import('views/check/home/Major/IncomeThirdDetail')

// 风控发票查询 路由
const Invoice = () => import('views/check/home/Invoice')
const InvoiceFreeList = () => import('views/check/home/Major/InvoiceFreeList')
const InvoiceCoopList = () => import('views/check/home/Major/InvoiceCoopList')
const InvoiceFrontierList = () => import('views/check/home/Major/InvoiceFrontierList')
const InvoiceThirdList = () => import('views/check/home/Major/InvoiceThirdList')

const InvoiceFreeDetail = () => import('views/check/home/Major/InvoiceFreeDetail')
const InvoiceCoopDetail = () => import('views/check/home/Major/InvoiceCoopDetail')
const InvoiceFrontierDetail = () => import('views/check/home/Major/InvoiceFrontierDetail')
const InvoiceThirdDetail = () => import('views/check/home/Major/InvoiceThirdDetail')

// 风控报税查询 路由
const Tax = () => import('views/check/home/Tax')
const TaxFreeList = () => import('views/check/home/Major/TaxFreeList')
const TaxCoopList = () => import('views/check/home/Major/TaxCoopList')
const TaxFrontierList = () => import('views/check/home/Major/TaxFrontierList')

// 风控业务合同路由 
const Deal = () => import('views/check/home/Deal')
const DealList = () => import('views/check/home/Major/DealList')

// 风控协议模板 路由
// 风控税收政策 路由
// 风控公司管理 路由

// 个人中心
const Setting = () => import('views/check/mine/Setting')
const ReviewPersonal = () => import('views/check/mine/ReviewPersonal')
const ReviewContract = () => import('views/check/mine/ReviewContract')
const EditPass = () => import('views/check/mine/EditPass')
export default [
  {   // 风控审核用户============================================================
    path: '/check_user',
    component: User,
  },
  {
    path: '/check_comlist',
    component: ComList
  },
  {
    path: '/check_freelist',
    component: FreeList
  },
  {
    path: '/check_cooplist',
    component: CoopList
  },
  {
    path: '/check_coopcomlist',
    component: CoopcomList
  },
  {
    path: '/check_frontierlist',
    component: FrontierList
  },
  {
    path: '/check_thirdlist',
    component: ThirdList
  },
  {
    path: '/check_relationlist',
    component: RelationList
  },


  {
    path: '/check_ud_company',
    component: DetailCompany
  },
  {
    path: '/check_ud_account',
    component: DetailAccount
  },
  {
    path: '/check_ud_contract',
    component: DetailContract
  },
  {
    path: '/check_ud_person',
    component: DetailPerson
  },
  {
    path: '/check_ud_individual',
    component: DetailIndividual
  },
  {
    path: '/check_ud_relation',
    component: DetailRelation
  },


  {    // 风控审核收入================================================
    path: '/check_income',
    component: Income
  },
  {
    path: '/check_incomefreelist',
    component: IncomeFreeList
  },
  {
    path: '/check_incomecooplist',
    component: IncomeCoopList
  },
  {
    path: '/check_incomefrontierlist',
    component: IncomeFrontierList
  },
  {
    path: '/check_incomethirdlist',
    component: IncomeThirdList
  },
  {
    path: '/check_incomefreedetail',
    component: IncomeFreeDetail
  },
  {
    path: '/check_incomecoopdetail',
    component: IncomeCoopDetail
  },
  {
    path: '/check_incomefrontierdetail',
    component: IncomeFrontierDetail
  },
  {
    path: '/check_incomethirddetail',
    component: IncomeThirdDetail
  },


  {    // 风控审核 发票================================================
    path: '/check_invoice',
    component: Invoice
  },
  {
    path: '/check_invoicefreelist',
    component: InvoiceFreeList
  },
  {
    path: '/check_invoicecooplist',
    component: InvoiceCoopList
  },
  {
    path: '/check_invoicefrontierlist',
    component: InvoiceFrontierList
  },
  {
    path: '/check_invoicethirdlist',
    component: InvoiceThirdList
  },
  {
    path: '/check_invoicefreedetail',
    component: InvoiceFreeDetail
  },
  {
    path: '/check_invoicecoopdetail',
    component: InvoiceCoopDetail
  },
  {
    path: '/check_invoicefrontierdetail',
    component: InvoiceFrontierDetail
  },
  {
    path: '/check_invoicethirddetail',
    component: InvoiceThirdDetail
  },




  {    // 风控审核 报税查询================================================
    path: '/check_tax',
    component: Tax
  }, 
  {
    path: '/check_taxfreelist',
    component: TaxFreeList
  },
  {
    path: '/check_taxcooplist',
    component: TaxCoopList
  },
  {
    path: '/check_taxfrontierlist',
    component: TaxFrontierList
  },

  {    // 风控审核 业务合同================================================
    path: '/check_deal',
    component: Deal
  }, 
  {
    path: '/check_deallist',
    component: DealList
  },





  {
    path: '/check_setting',   // 个人中心: 设置============================================
    component: Setting,
  },
  {
    path: '/check_revpersonal',   // 个人中心: 的个人信息====
    component: ReviewPersonal,
  },
  {
    path: '/check_revcontract',   // 个人中心: 协议信息====
    component: ReviewContract,
  },
  {
    path: '/check_editpass',   // 个人中心: 修改密码====
    component: EditPass,
  },

]

