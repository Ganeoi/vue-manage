import Cookie from 'js-cookie'
export default {
  state: {
    token: ''
  },
  mutations: { //设置mutation用于改变token
    setToken(state, val) {
      state.token = val
      Cookie.set('token', val)
    },
    // 清空cookie
    clearToken(state) {
      state.token = ''
      Cookie.remove('token')
    },
    getToken(state) {
      // 进行判断容错，如果当前cookie中没有token则从state中获取
      state.token = state.token || Cookie.get('token')
    }
  }
}