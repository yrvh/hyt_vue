// 风控的所有数据请求
import {myaxios} from "./request";
const root = '/control_app'


export function getUserMain(usertype) {   // 风控获取用户信息
  return myaxios({
    method: 'post',
    url: root+'/ms/fr/user/main ',
    data: {
      pass_app: 'ZGQ0YjIxZTllZjcxZTEyOTExODNhNDZiOTEzYWU2ZjI=',
      tel_app: '18577949311',
      code_app: 'GZzwwWYmmWZhH1m87urHEjnEu3iR119i5FNMdJl6rlxFq5WpvKII3BeoOOTft4Wt',
      usertype: usertype
    }
  })
}

export function getHomeMultidata() {   // why的接口
  return myaxios({
    url: '/home/multidata'
  })
}