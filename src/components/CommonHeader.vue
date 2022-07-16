<template>
  <header>
    <div class="l-content">
      <!-- 在elementUI中引入el-icon-menu，；点击事件，改变state的状态 -->
      <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
      <!-- 使用面包屑组件 -->
      <el-breadcrumb separator="/" class="bcrumb">
        <!-- 对tags中的数据进行循环遍历 -->
        <el-breadcrumb-item v-for="item in tags" key="item.path" :to="{ path: 'item.path' }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <!-- 右上角的图标，设置触发下拉的行为trigger 和尺寸size  -->
      <el-dropdown trigger="click" size="mini">
        <span>
          <!-- :src 动态引入图片 -->
          <img class="user" :src="userImg" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <!-- @click.native 给组件添加事件-->
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
// 引入vuex中的辅助函数(用于面包屑组件使用)
import { mapState } from 'vuex'
export default {
  name: 'CommonHeader',
  data() {
    return {
      userImg: require('../assets/images/user.png')
    }
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    },
    // 登出逻辑：清除token，重置menu，并跳转到登录页
    logOut() {
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push("/login")
    }
  },
  // 在页面中注入state数据
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  }
}
</script>
<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
/deep/ .el-breadcrumb__inner {
  color: #d4cfcf;
  font-weight: 400;
}
/deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner{
  color: #d4cfcf;
  font-weight: 700;
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
