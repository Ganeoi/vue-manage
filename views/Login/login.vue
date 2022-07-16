<template>
  <!-- 使用表单组件 : status-icon 表单校验时显示的图表； rules 添加校验属性; ref 获取form下的实例-->
  <el-form
    :model="form"
    status-icon
    :rules='rules'
    ref="form"
    label-width="100px"
    class="login-container"
  >
    <h3 class="login_title">系统登录</h3>
    <!-- 用户名输入框 -->
    <el-form-item
      label="用户名"
      label-width="80px"
      prop="username"
      class="username"
    >
      <!-- autocomplete	属性，是否自动补全 -->
      <el-input
        type="input"
        v-model="form.username"
        autocomplete="off"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>
    <!-- 密码输入框 -->
    <el-form-item
      label="密码"
      label-width="80px"
      prop="password"
    >
      <el-input
        type="password"
        v-model="form.password"
        autocomplete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="login_submit">
      <el-button type="primary" @click="login" class="login_submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
// 引入接口
import Mock from 'mockjs'
import { getMenu } from '../../api/data'
export default {
  name: 'login',
  data () {
    return {
      form: {},
      // 进行表单校验的定义
      rules: {
        // 校验用户名  required: true 设置为必填内容；message:校验不通过的提示信息; trigger: 设置触发的方式为blur 失去焦点时触发 
        username: [
          { required: true, message: "请输入用户名", trigger: "blur"},
          {
            // 用户名最小长度的限制
            min: 2,
            message: "用户名长度不能小于2位",
            trigger: 'blur'
          }
        ],
        // 用户密码的校验
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    login() {
      // 调用Api 将储存在form中账号密码进行传入
      getMenu(this.form).then(({ data: res })=> { // 从res 中解构出data
        console.log(res, 'res')
        //判断 接口返回res
        if(res.code === 20000) { // 如果状态码code正常
            // 登录成功后，先进行路由的清除
            this.$store.commit('clearMenu')
            // 调用setMenu进行路由设置
            this.$store.commit('setMenu', res.data.menu)
            // token设置
            this.$store.commit('setToken', res.data.token)
            // 动态添加路由 并传入router实例
            this.$store.commit('addMenu', this.$router)
            // 页面跳转
            this.$router.push({ name: 'home' })
        } else { // 状态码异常，抛出异常 显示警示信息
          this.$message.warning(res.data.message)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  border-radius: 15px;
  // 背景裁剪的内边距
  background-clip: padding-box;
  margin: 180px auto;
  width: 380px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cacaca;
}
.login_title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505050;
}
.login_submit {
  margin: 10px auto 0 auto;
}
</style>
