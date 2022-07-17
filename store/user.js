// 登录权限的配置：token存储在该文件
import Cookie from 'js-cookie'
export default {
  state: {
    // 定义token，设置默认值
    token: ''
  },
  mutations: { //设置mutation用于改变token
    // 设置token
    setToken(state, val) {
      state.token = val
      // 调用cookie中的set方法
      Cookie.set('token', val)
    },
    // 清空cookie
    clearToken(state) {
      state.token = ''
      Cookie.remove('token')
    },
    // 获取token
    getToken(state) {
      // 进行判断容错，如果当前cookie中没有token则从state中获取
      state.token = state.token || Cookie.get('token')
    }
  }
}