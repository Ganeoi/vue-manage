
// 对axios进行二次封装
import axios from 'axios'
// 引入配置文件
import config from '../config'

// 对当前的环境变量 NODE_ENV 进行判断, 拿到相对应的请求接口地址
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

// axios的工具类
class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl 
  }

  // 定义axios的相关配置 (面向对象的应用)
  getInsideConfig() {
    const config = {
      baseUrl: this.baseUrl,
      header: {}
    }
    return config 
  }
  // 拦截器相关函数  instance为axios的实例
  interceptors(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
      // 在发送请求之前的处理
      return config;
    }, function (error) {
      // 对请求错误的处理
      return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
      console.log(response, 'response')
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据的处理
      return response;
    }, function (error) {
      console.log(error, 'error')
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误的处理
      return Promise.reject(error);
    });
  }
  // request函数 接口请求时调用，接收传入的相关配置 options
  request(options) {
    // 创建axios实例
    const instance = axios.create()
    // 拿到传入的相关的函数，和配置的相关信息 进行调用
    //将调用函数拿到的对象，和传进来的参数进行解构 (...)
    options = { ...this.getInsideConfig(), ...options }
    // 调用拦截器 传入instance实例
    this.interceptors(instance)
    // 调用完成后 返回接口请求的结果
    return instance(options)
  }
} 
  
export default new HttpRequest(baseUrl)