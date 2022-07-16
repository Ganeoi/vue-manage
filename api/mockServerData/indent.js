import Mock from 'mockjs'
 
function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}
 
let List = []
const count = 200
 
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      oNumber: Mock.Random.string('number', 19, 19),
      price: Mock.Random.float(5, 300, 2, 2),
      deliver: Mock.Random.pick(['是', '否']),
      address: Mock.mock('@county(true)'),
      time: Mock.Random.datetime(),
    })
  )
}
 
export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
  */
  // 该方法用于 生成当前页面数据的逻辑
  getIndentList: config => {
    const { oNumber, page = 1, limit = 20 } = param2Obj(config.url)
    console.log('name:' + oNumber, 'page:' + page, '分页大小limit:' + limit)
    const mockList = List.filter(indent => {
      if (oNumber && indent.oNumber.indexOf(oNumber) === -1 && indent.time.indexOf(oNumber) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      count: mockList.length,
      list: pageList
    }
  },
  /**
   * 增加用户
   * @param oNumber, time, address, deliver, price
   * @return {{code: number, data: {message: string}}}
   */
  createIndent: config => {
    const { address, time, oNumber, deliver, price } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    List.unshift({
      id: Mock.Random.guid(),
      address: address,
      time: time,
      oNumber: oNumber,
      deliver: deliver,
      price: price,
    })
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteIndent: config => {
    const { id } = param2Obj(config.url)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  },
  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: config => {
    let { ids } = param2Obj(config.url)
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 20000,
      data: {
        message: '批量删除成功'
      }
    }
  },
  /**
   * 修改用户
   * @param id, address, time, oNumber, deliver, price
   * @return {{code: number, data: {message: string}}}
   */
  updateIndent: config => {
    const { id, address, time, oNumber, deliver, price } = JSON.parse(config.body)
    List.some(u => {
      if (u.id === id) {
        u.address = address
        u.time = time
        u.oNumber = oNumber
        u.deliver = deliver
        u.price = price
        return true
      }
    })
    return {
      code: 20000,
      data: {
        message: '编辑成功'
      }
    }
  }
}