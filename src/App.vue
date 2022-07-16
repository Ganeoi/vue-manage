<template>
  <div id="app">
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}
#app {
  /* vh/vw 是相对于视口的高/宽 的单位，1vh等于视口高度的1% */
  height: 100vh;
}
</style>
