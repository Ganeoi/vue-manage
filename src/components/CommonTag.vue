<template>
  <div class="tabs">
    <!-- closable判断是否有可删除按钮;; close 添加删除事件-->
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
      size="small"
    >
      {{ tag.label }}
    </el-tag>
    <slot name="sel"></slot>
  </div>
</template>
<script>
// 借助vuex中的辅助函数 mapstate 来拿到 tabsList 中的数据；使用mapMutations 来调用mutations
import { mapState,mapMutations } from 'vuex'
export default {
  name: 'CommonTag',
  data() {
    return{

    }
  },
  // 把vuex中 state注入到当前页面中
  computed: {
    //  ...mapState 对mapState进行解构
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  methods: {
    ...mapMutations({
      close: 'closeTag'
    }),
    // 使用函数式编程 实现点击面包屑，进行路由的跳转
    changeMenu(item) {
      this.$router.push({name: item.name })
    },
    // 对点击的删除事件进行判断处理
    handleClose(tag, index) {
      // 数组的长度-1，得到最后一个tags的index
      const length = this.tags.length - 1
      this.close(tag)
      // 如果点击的面包屑的name跟路由的name不一致，直接返回
      if (tag.name !== this.$route.name) {
        return;
      }
      // 如果当前的索引号跟length一致，表示点击的是最后一个，侧鼠标的焦点往左移一个,同时路由也进行同步
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name
        })
      } else { //如果处于中间,则往右移一个
          this.$router.push({
            name: this.tags[index].name
          })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>