<template>
  <div class="common-table">
    <!-- data：接收外部传入的table的数据 -->
    <el-table :data="tableData" height="90%" stripe >
      <slot name="new"></slot>
      <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
      <!-- 具体列的组件 ; show-overflow-tooltip 设置溢出内容的显示形式-->
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 130"
        header-align="center"
        align="center"
      >
        <!-- 预留接收自定义传入的列的相关配置 -->
        <template slot-scope="scope">
          <span style="margin-left: ">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" min-width="180" align="center">
        <!-- 使用slot-scope属性，当点击按钮时获得 scope.row 中当前行的数据 -->
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件: current-page.sync 表示当前的页面数 ; @current-change 切换页面时调用回调函数 ;page-size 当前分页展示数据条数的默认值-->
    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
      :page-size="20"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: 'CommonTable',
  props: {
    // 用于接收组件传入的属性
    tableData: Array,
    tableLabel: Array,
    config: Object,
  },
  data() {
    return {}
  },
  methods: {
    handleEdit(row) {
      this.$emit('edit', row)
    },
    handleDelete(row) {
      this.$emit('del', row)
    },
    changePage(page) {
      this.$emit('changePage', page)
    }
  }
}
</script>
<style lang="less" scoped>
.common-table {
  height: calc(100% - 62px);
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>
