// 公共的工具类, 公共的方法,

export function sum(a,b) {
  return a + b
}
// 返回上一页
export function clickLeft(num=null) {
  if(num) this.$router.go(num)
  this.$router.back()
}

// 手机号 校验规则
export function checkMobile(val) {
  const patt = /^(0|86|17951)?(13[0-9]|14[5-9]|15[012356789]|166|17[0-9]|18[0-9]|19[8-9])[0-9]{8}$/;
  return patt.test(val)
} 
// 座机号 校验规则
export function checkFixed(val) {
  const patt = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
  return patt.test(val)
} 

// 密码 校验规则
export function checkPwd(val) {
  const patt = /^([A-Za-z])[0-9A-Za-z]{7,17}$/;
  return patt.test(val)
}
// 用户名 校验规则
export function checkUsername(val) {
  const patt = /^([A-Za-z])[0-9A-Za-z]{1,14}$/;
  return patt.test(val)
}
// 真名 校验规则
export function checkRealname(val) {
  const patt = /^[A-Za-z\u4E00-\u9FA5\uf900-\ufa2d·s]{2,15}$/;
  return patt.test(val)
}
// 邮箱 校验规则
export function checkEmail(val) {
  const patt = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return patt.test(val)
}
// 身份证号 校验规则
export function checkIdcard(val) {
  const patt = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  return patt.test(val)
}

// 银行卡号 校验规则
export function checkBank(val) {
  const patt = /^([1-9]{1})[0-9]{7,21}$/;
  return patt.test(val)
}

// 公司名称, 抬头名
export function checkComname(val) {
  const patt = /^([A-Za-z\u4E00-\u9FA5])[0-9A-Za-z\u4E00-\u9FA5\uf900-\ufa2d·s]{1,21}$/;
  return patt.test(val)
}

// 统一社会信用代码, 校验
export function checkTaxcode(val) {
  const patt = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/;
  return patt.test(val)
}

// 地址校验规则
export function checkAddress(val) {
  const patt = /^([A-Za-z\u4E00-\u9FA5])[0-9A-Za-z\u4E00-\u9FA5\uf900-\ufa2d·s_\-\。\、\.]{9,49}$/;
  return patt.test(val)
}

// 合同标题 校验规则
export function checkDeal(val) {
  const patt = /^([A-Za-z\u4E00-\u9FA5])[0-9A-Za-z\u4E00-\u9FA5\uf900-\ufa2d·s]{2,49}$/;
  return patt.test(val)
}