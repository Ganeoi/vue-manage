<template>
  <!-- 弹出框 -->
  <!-- 通过ref拿到form的实例 -->
  <el-form ref="form" label-width="100px" :model="form" :inline="inline" >
    <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
      <!-- 输入框组件 -->
      <el-input 
        v-if="item.type === 'input'"
        :placeholder="'请输入' + item.label"
        v-model="form[item.model]"
      >
      </el-input>
      <!-- 开关 -->
      <el-switch v-if="item.type === 'switch'" v-model="form[item.model]"></el-switch>
      <!-- 日期选择组件 value-format设置日期显示的格式-->
      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        v-model="form[item.model]"
      ></el-date-picker>
      <!-- 日期时间选择组件 -->
      <el-date-picker
        v-if="item.type === 'datetime'"
        type="datetime"
        placeholder="选择日期时间"
        v-model="form[item.model]"
        value-format="yyyy-MM-dd HH:mm:ss"
        >
      </el-date-picker>
      <!-- 性别选择框 -->
      <el-select
        v-if="item.type === 'select'"
        placeholder="请选择"
        v-model="form[item.model]"
      >
      <!-- el-option 下拉组件，通过对opts属性的遍历，渲染出下拉显示的内容  ; label是下拉的名称; value是下拉后具体的枚举值-->
      <!-- 下拉选中的值，会赋值给select 的属性上 -->
      <el-option
        v-for="item in item.opts"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
      </el-select>
    </el-form-item>
    <!-- 如果当前组件都不满足，则可以自定义传入内容 -->
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'CommonForm',
  // props 用于接收form的一些属性
  props: {
    // form的相关配置
    formLabel: Array,
    // form 的数据
    form: Object,
    // form的布局
    inline: Boolean
  },
  data () {
      return{}
  }
}
</script>