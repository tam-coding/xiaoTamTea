import {request} from '../utils/request'

export const reqNavList=()=>request({
  url:"/nav/get",
  method:'post'
})

export const reqNewsList=(data)=>request({
  url:'/new/get',
  method:'post',
 data
})

export const reqProductList=(data)=>request({
  url:'/product/getlist',
  method:'post',
  data
})

export const reqNewsDetail=(data)=>request({
  url:'/news/detail',
  method:'post',
 data
})

export const reqProductDetail=(data)=>request({
  url:'/product/detail',
  method:'post',
 data
})