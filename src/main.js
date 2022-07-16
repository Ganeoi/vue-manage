import Vue from "vue";
import App from "./App.vue";
// 1.按需（局部）引入ElementUI 插件中的Button, Radio...
import {
  Button,
  Radio,
  Container,
  Header,
  Main,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Row,
  Card,
  Col,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Switch,
  DatePicker,
  TimePicker,
  Dialog,
  Pagination,
  MessageBox,
  Message,
  Tabs,
  TabPane
} from "element-ui";
// 引入ElementUI 的样式文件
import "element-ui/lib/theme-chalk/index.css";
import "./assets/less/index.less";

import router from "../router";
import store from "../store";
// 引入axios
import http from "axios";
// 注入mock，在views/home/index.js中进行调用
import "../api/mock.js";
import tab from "../store/tab";

Vue.config.productionTip = false;
// 2.vue中注入ElementUI插件
Vue.use(Button);
Vue.use(Radio);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Row);
Vue.use(Card);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Switch);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Tabs);
Vue.use(TabPane);

// 将axios 绑定在vue 的pototype属性上，才能使用
Vue.prototype.$http = http;

// 直接调用 this.confirm 方法，需要将 MessageBox插件下的confirm方法，绑定在vue实例上
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

// 导航守卫
router.beforeEach((to, from, next) => {
  // 获取token信息，调用gettoken 目的是防止刷新页面后，vuex丢失token信息
  store.commit('getToken')
  const token = store.state.user.token
  // 拿到token 进行判断：如果token不存在，并且当前页不是登录页，则返回到登录页
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') { //判断 如果当前存在token并且当前访问的是登录页，则跳转到首页
    next({name: 'home'})
  } else {
    next()
  }
})

new Vue({
  store,
  router,
  render: (h) => h(App),
  // 刷新白屏问题的原因：在验证成功后进行了菜单的设置，但在页面刷新后没有进行路由的动态设置
  // 解决方法：在vue实例生成前，在生命周期函数create中，调用动态设置路由的方法
  created() {
    store.commit('addMenu', router)
  }

}).$mount("#app");
