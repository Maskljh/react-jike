import { method } from "lodash";
import { request } from "../utils";

function getChannelAPI(){
  return request({
    url:'/channels',
    method:'GET'
  })
  
}

function createArticleAPI(data){
  return request({
    url:'/mp/articles?draft=false',
    method:'POST',
    data
  })
}

function getArticleAPI(params){
  return request({
    url:'/mp/articles',
    method:'GET',
    params
  })
}

function deleteArticleAPI(target){
  return request({
    url:`/mp/articles/${target}`,
    method:'DELETE',
  })
}

function getArticleInfoAPI(target){
  return request({
    url:`/mp/articles/${target}`,
    method:'GET'
  })
}

function changeArticleAPI(data){
  return request({
    url:`/mp/articles/${data.id}?draft=false`,
    method:'PUT',
    data
  })
}
export { getChannelAPI, createArticleAPI, getArticleAPI, deleteArticleAPI, getArticleInfoAPI, changeArticleAPI }