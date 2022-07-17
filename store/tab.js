import Cookie from 'js-cookie'
// import router from '../router'
export default {
  state: { //state设置初始的状态
    // 定义一个管理是否展开的变量 isCollapse，默认展开状态
    isCollapse: false,
    // 进行面包屑数据的存储
    // tabsList存储初始化的数据
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ],
    // 记录当前选中的路由，进行面包屑的高亮显示
    currentMenu: null,
    menu:[]
  },
  // 定义一个改变state的方法
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    // 当点击菜单时，改变tabsList中的数据 来进行不同数据的展示和高亮显示
    selectMenu(state, val) {
      if (val.name !== 'home') {
        state.currentMenu = val
        const result = state.tabsList.findIndex(item => item.name === val.name) //通过findIndex的方法来判断是否存在
        // 如果不存在，即等于-1 就添加点击按钮(面包屑)
        if (result === -1) {
          state.tabsList.push(val)
        }
      } else { //如果选中的菜单时首页，就进行重置
        state.currentMenu = null
      }
    },
    // 对 点击删除事件 进行判断，来对数据源进行删除修改
    closeTag(state, val) {
      const result = state.tabsList.findIndex(item => item.name === val.name)
      // 通过splice 进行删除
      state.tabsList.splice(result, 1)
    },
    // 添加menu修改的相关方法
    setMenu(state, val) {
        state.menu = val,
        // 将menu数据缓存在cookie中，避免刷新浏览器时丢失menu数据(即仍然处于当前的页面中？？) ：JSON.stringify 对数据进行数列化
        Cookie.set('menu', JSON.stringify(val))
    },
    // 重置menu数据
    clearMenu(state) {
      state.menu = []
      Cookie.remove('menu')
    },
    // 路由动态添加
    addMenu(state, router) {
      if (!Cookie.get('menu')) {
        return  // 判断 如果cookie中不存在menu的数据，则直接返回
      }
      //如果存在menu，对menu进行相关处理
      // 将序列化的menu数据转成对象
      const menu = JSON.parse(Cookie.get('menu'))
      // 对menu进行更新赋值
      state.menu = menu
      // 动态添加路由前 的数据处理
      const menuArray = []
      menu.forEach(item => {
        if (item.children) { // 如果有子菜单，则进行遍历
          item.children = item.children.map(item => {
            // 使用es6 模板字符串 进行路径拼接
            item.component = () => import(`../views/${item.url}`)
            return item
          })
          // 将数组进行解构
          menuArray.push(...item.children)
        } else {
          item.component = () => import(`../views/${item.url}`)
          menuArray.push(item)
        }
      });
      // 路由的动态添加
      menuArray.forEach(item => {
        router.addRoute('Main', item) //item是指需要添加的页面
      })
    }
  }
}