import http from './../../../base/api/public'   //此处引用了公共的js，js中有调用http请求的方法
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;


//定义方法，请求服务端的页面查询接口
export const page_list = (page,size,params) =>{
   //将params对象中的值拼装城key/value形式用于发送get请求
  let queryString  = querystring.stringify(params);
  return http.requestQuickGet(apiUrl + "/cms/page/list/"+ page +"/"+ size + "?" + queryString);
}


//新增方法
export const page_add = params => {
   return http.requestPost(apiUrl + "/cms/page/add",params)
}

export const page_get = id =>{
  return http.requestQuickGet(apiUrl+'/cms/page/get/'+id)
}

//修改页面提交
export const page_edit = (id,params) =>{
  return http.requestPut(apiUrl+'/cms/page/edit/'+id,params)
}

//修改页面提交
export const page_del = id =>{
  return http.requestDelete(apiUrl+'/cms/page/del/'+id)
}


export const page_postPage= id => {
  return http.requestPost(apiUrl+'/cms/page/post/'+id)
}

