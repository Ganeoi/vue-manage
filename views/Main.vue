<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <!-- 使用组件commonAside 注意vue中使用组件时，驼峰命名要换成小写 用横线链接-->
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>
      <common-tag />
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 引入组件
import CommonAside from '../src/components/CommonAside.vue'
import CommonHeader from '../src/components/CommonHeader.vue'
import CommonTag from '../src/components/CommonTag.vue'
export default {
  name: 'Home',
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0;
}
</style>
