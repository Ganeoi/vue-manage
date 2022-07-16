import Mock from 'mockjs'
 
// 图表数据
let List = []
export default {
  getStatisticalData: () => {
    //Mock.Random.float 产生随机数10到500之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        // 使用mock规则生成随机数据
        Mock.mock({
          考研类: Mock.Random.float(10, 500, 0, 0),
          考公类: Mock.Random.float(10, 500, 0, 0),
          编制类: Mock.Random.float(10, 500, 0, 0),
          真题: Mock.Random.float(10, 500, 0, 0),
          教资类: Mock.Random.float(10, 500, 0, 0),
          笔试: Mock.Random.float(10, 500, 0, 0)
        })
      )
    }
    // 返回的结果
    return {
      code: 20000,
      data: {
        // 饼图
        videoData: [
          {
            name: '考研类',
            value: 397
          },
          {
            name: '考公类',
            value: 299
          },
          {
            name: '教资类',
            value: 203
          },
          {
            name: '笔试',
            value: 75
          },
          {
            name: '真题',
            value: 182
          },
          {
            name: '编制类',
            value: 175
          }
        ],
        // 柱状图
        userData: [
          {
            date: '周一',
            new: 5,
            active: 200
          },
          {
            date: '周二',
            new: 10,
            active: 500
          },
          {
            date: '周三',
            new: 12,
            active: 550
          },
          {
            date: '周四',
            new: 60,
            active: 800
          },
          {
            date: '周五',
            new: 65,
            active: 550
          },
          {
            date: '周六',
            new: 53,
            active: 770
          },
          {
            date: '周日',
            new: 33,
            active: 170
          }
        ],
        // 折线图
        orderData: {
          date: ['20220701', '20220702', '20220703', '20220704', '20220705', '20220706', '20220707'],
          data: List
        },
        // 图表数据
        tableData: [
          {
            name: '考研类',
            todayBuy: 23,
            monthBuy: 207,
            totalBuy: 551
          },
          {
            name: '编制类',
            todayBuy: 12,
            monthBuy: 101,
            totalBuy: 327
          },
          {
            name: '考公类',
            todayBuy: 25,
            monthBuy: 219,
            totalBuy: 650
          },
          {
            name: '真题',
            todayBuy: 10,
            monthBuy: 92,
            totalBuy: 203
          },
          {
            name: '教资类',
            todayBuy: 35,
            monthBuy: 22,
            totalBuy: 256
          },
          {
            name: '笔试',
            todayBuy: 18,
            monthBuy: 87,
            totalBuy: 198
          }
        ]
      }
    }
  }
}