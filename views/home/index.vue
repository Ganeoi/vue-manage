<template>
  <!-- 引用layout插件 -->
  <!-- gutter 定义总的栅格数 -->
  <el-row class="home" :gutter="20">
    <!-- span设置所占用的当前行的栅格数 -->
    <el-col :span="8" style="margin-top: 20px">
      <!-- 引用card卡片组件，进行个人信息展示 -->
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">Ganeoi</p>
            <p class="access">管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-07-07</span></p>
          <p>上次登录地点：<span>湛江</span></p>
        </div>
      </el-card>
      <!-- 左侧tabel数据展示 -->
      <el-card style="margin-top: 20px; height: 455px">
        <el-table :data="tableData" > 
          <!-- prop 属性能读取对应列中相对应的名称；label属性对应每一个列的value值 -->
          <el-table-column
          v-for="(val, key) in tableLabel" 
          :key="key"
          :prop="key"
          :label="val"
          align="center"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 右上订单信息区域的展示 -->
    <el-col style="margin-top: 20px" :span="16">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
          <!-- 图标显示设置 :class根据渲染的数据动态绑定不同的字体图标；:style根据绑定的字体图标动态更改背景样式 -->
          <!-- 注意这里拼接`el-icon-${item.icon}` 使用的是tab键对上的符号，不是单引号！！ -->
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <!-- 右边部分对应金额和名称 的展示 -->
          <div class="detail">
            <p class="num">￥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <!-- 三个echarts 树状图和饼状图的展示 -->
      <!-- 折线图 -->
      <el-card style="height: 280px">
        <echart :chartData="echartData.order" style="height: 280px"/>
      </el-card>
      <div class="graph">
        <!-- 用户图user（柱状图） -->
        <el-card style="height: 260px">
          <echart :chartData="echartData.user" style="height: 240px" />
        </el-card>
        <!-- 饼状图 -->
        <el-card style="height: 260px">
          <!-- :isAxisCharts="false" 指当前的不是折线图/柱状图的配置 -->
          <echart :chartData="echartData.video" :isAxisChart="false" style="height: 240px"/>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
// 调用接口请求
import { getData } from '../../api/data.js' 
// 引入echarts组件
import Echart from '../../src/components/ECharts.vue'


export default {
  name: "home",
  // 进行组件的引入调用
  components: {
    Echart
  },
  data() {
    return {
      // 动态引入图片
      userImg: require("../../src/assets/images/user.png"),
      // 写入预先编写好的数据(左侧的数据)
      tableData: [],
      // 定义一个对象，再对每一列的数据遍历 进行渲染展示
      tableLabel: {
        name: '类别',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      // 右上角的数据
      countData: [
        {
          name: "今日支付订单",
          value: 156,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 107,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 9,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1204,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 26,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      // 定义echarts中的data数据
      echartData: {
        // 折线图
        order: {
          xData: [],
          series: []
        },
        // 柱状图
        user: {
          xData: [],
          series: []
        },
        // 饼状图
        video: {
          series: []
        }
      }
    };
  },
  // 接口请求, 一般在mounted生命周期下
  mounted() {
    // 调用接口请求
    getData().then(res => {
      // 获取res中data的数据，并进行解构
      const { code, data } = res.data
      if (code === 20000) {
        this.tableData = data.tableData
        // 对拿到的数据进行处理
        const order = data.orderData
        const xData = order.date
        // 取出数据中key值
        const keyArray = Object.keys(order.data[0])
        // 组装series数据
        const series = []
        // 将取出的 keyArray 数据进行遍历
        keyArray.forEach(key => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]),
            // 图标的类型
            type: 'line'
          })
        })

        this.echartData.order.xData = xData
        this.echartData.order.series = series

        // 柱状图
        this.echartData.user.xData = data.userData.map(item => item.date)
        this.echartData.user.series = [
        {
          name: '新增用户',
          data: data.userData.map(item => item.new),
          // 柱状图
          type: 'bar'
        },
        {
          name: '活跃用户',
          data: data.userData.map(item => item.active),
          type: 'bar'
        }
      ]

        // 饼图        
      this.echartData.video.series = [
            {
              data: data.videoData,
              type: 'pie'
            }
          ]
      }
    })
  }
};
</script>
