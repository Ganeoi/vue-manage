import Vue from 'vue'
import Vuex from 'vuex'
// 引入两个自定义的模块
import tab from './tab'
import user from './user'


// 把vuex进行全局注入
Vue.use(Vuex)

// 通过module的范式，将不同模块的store进行引入
// 将store进行对外暴露
export default new Vuex.Store({
  // 通过模块的方式来定义store
  modules: {
    tab,
    user,
  }
})