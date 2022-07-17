<<<<<<< HEAD
import Vue from 'vue'
import VueRouter from 'vue-router'

// 1.全局引入router
Vue.use(VueRouter)

const routes = [
  {
    // Main作为所有页面的公共部分
    path: '/',
    name: 'Main',
    // 2.按需引入路由组件
    component: () => import('../views/Main.vue'),
    redirect: '/login',
    children: []
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/login.vue')
  }
]

// 3.对路由进行相关配置
// 声明router变量 来接收router实例
const router = new VueRouter({
  mode: 'history', 
  routes
})

=======
import Vue from 'vue'
import VueRouter from 'vue-router'

// 1.全局引入router
Vue.use(VueRouter)

const routes = [
  {
    // Main作为所有页面的公共部分
    path: '/',
    name: 'Main',
    // 2.按需引入路由组件
    component: () => import('../views/Main.vue'),
    redirect: '/login',
    children: []
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/login.vue')
  }
]

// 3.对路由进行相关配置
// 声明router变量 来接收router实例
const router = new VueRouter({
  mode: 'history', 
  routes
})

>>>>>>> ada1ce3e28e10678653f4fcdd6c8a602d691b7cc
export default router