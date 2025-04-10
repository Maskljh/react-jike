import { request } from "@/utils/request.js";

function loginAPI(loginForm){
  return request({
    url:'/authorizations',
    method:'POST',
    data:loginForm
  })
}


function getProfileAPI(){
  return request({
    url:'/user/profile',
    method:'GET'
  })
}

export {loginAPI,getProfileAPI}