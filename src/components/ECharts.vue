<<<<<<< HEAD
<template>
  <div ref="echart"></div>
</template>
<script>
import * as echart from 'echarts'
// 编写接收的相应的属性和内部逻辑
export default {
  // 定义一个属性，用于区分不同的图形类型
  props: {
    // 判断是 折线图/柱状图 或者是饼状图
    isAxisChart: { //饼状图
      type: Boolean,
      default: true
    },
    chartData: { //折线图/柱状图
      type: Object,
      default() {
        return {
          xData: [],
          series: []
        }
      }
    }
  },
  // 对传入的chartsdata数据进行监听, 当数据发生改变时进行重新绘制图表
  watch: {
    chartData: {
      handler: function() {
        this.initChart()
      },
      deep: true
    }
  },
  // 分不同图表的情况 进行echarts初始化
  methods: {
    initChart() {
      this.initChartData()
      // 拿到配置数据，进行echarts渲染
      if (this.echart) {
        this.echart.setOption(this.options)
      }else {
        this.echart = echart.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
    initChartData() {
      if (this.isAxisChart) {
          this.axisOption.xAxis.data = this.chartData.xData
          this.axisOption.series = this.chartData.series
      }else {
        this.normalOption.series = this.chartData.series
      }
    }
  },
  data() {
    return {
      // 折线图/柱状图的配置
      axisOption: {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
        series: [],
      },
      // 饼状图的配置
      normalOption: {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [],
        },
        // 判断echarts是否进行了渲染
        echart: null
    }
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption
    }
  }
}
</script>
=======
<template>
  <div ref="echart"></div>
</template>
<script>
import * as echart from 'echarts'
// 编写接收的相应的属性和内部逻辑
export default {
  // 定义一个属性，用于区分不同的图形类型
  props: {
    // 判断是 折线图/柱状图 或者是饼状图
    isAxisChart: { //饼状图
      type: Boolean,
      default: true
    },
    chartData: { //折线图/柱状图
      type: Object,
      default() {
        return {
          xData: [],
          series: []
        }
      }
    }
  },
  // 对传入的chartsdata数据进行监听, 当数据发生改变时进行重新绘制图表
  watch: {
    chartData: {
      handler: function() {
        this.initChart()
      },
      deep: true
    }
  },
  // 分不同图表的情况 进行echarts初始化
  methods: {
    initChart() {
      this.initChartData()
      // 拿到配置数据，进行echarts渲染
      if (this.echart) {
        this.echart.setOption(this.options)
      }else {
        this.echart = echart.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
    initChartData() {
      if (this.isAxisChart) {
          this.axisOption.xAxis.data = this.chartData.xData
          this.axisOption.series = this.chartData.series
      }else {
        this.normalOption.series = this.chartData.series
      }
    }
  },
  data() {
    return {
      // 折线图/柱状图的配置
      axisOption: {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
        series: [],
      },
      // 饼状图的配置
      normalOption: {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [],
        },
        // 判断echarts是否进行了渲染
        echart: null
    }
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption
    }
  }
}
</script>
>>>>>>> ada1ce3e28e10678653f4fcdd6c8a602d691b7cc
