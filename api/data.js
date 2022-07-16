// 该文件 定义接口请求
// 引入axios实例类
import axios from './axios'

// 接口调用 （定义一个接口请求的方法）
export const getMenu = (param) => {
  return axios.request({
    // 接口的相关地址
    url: '/permission/getMenu',
    // 定义接口类型 post请求
    method: 'post',
    // 作为post中参入的参数
    data: param
  })
}

// 定义getData，声明api调用的方法
export const getData = () => {
  return axios.request({
    url: '/home/getData'
    // 默认是get请求
  })
}

// 配置请求的接口地址，提交方式，返回的模拟数据
export const getUser = (params) => {
  return axios.request({
    url: '/user/getUser',//注意 这里的路径需要和mock.js中的 路径rurl 一致
    method: 'get',
    params
  })
}

export const getMall = (params) => {
  return axios.request({
    url: '/mall/getMall',
    method: 'get',
    params
  })
}

export const getIndent = (params) => {
  return axios.request({
    url: '/indent/getIndent', 
    method: 'get',
    params
  })
}

export const getAfterSale = (params) => {
  return axios.request({
    url: '/afterSale/getAfterSale', 
    method: 'get',
    params
  })
}