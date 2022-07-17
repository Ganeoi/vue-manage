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
      number: Mock.Random.natural(0, 100),
      update: Mock.Random.datetime(),
      isbn: Mock.Random.string('upper', 13, 13),
      oPrice: Mock.Random.float(20, 100, 2, 2),
      // Mock.Random.float( min, max, dmin, dmax )
      // 生成随机数，dmin最少小数点后的位数；dmax最多小数点后的位数
      dPrice: Mock.Random.float(5, 20, 2, 2)
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
  getMallList: config => {
    const { isbn, page = 1, limit = 20 } = param2Obj(config.url)
    console.log('isbn:' + isbn, 'page:' + page, '分页大小limit:' + limit)
    const mockList = List.filter(mall => {
      if (isbn && mall.isbn.indexOf(isbn) === -1 && mall.update.indexOf(isbn) === -1) return false
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
   * @param isbn, update, number, dPrice, oPrice
   * @return {{code: number, data: {message: string}}}
   */
  createMall: config => {
    const { number, update, isbn, dPrice, oPrice } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    List.unshift({
      id: Mock.Random.guid(),
      number: number,
      update: update,
      isbn: isbn,
      dPrice: dPrice,
      oPrice: oPrice,
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
  deleteMall: config => {
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
   * @param id, number, update, isbn, dPrice, oPrice
   * @return {{code: number, data: {message: string}}}
   */
  updateMall: config => {
    const { id, number, update, isbn, dPrice, oPrice } = JSON.parse(config.body)
    List.some(u => {
      if (u.id === id) {
        u.number = number
        u.update = update
        u.isbn = isbn
        u.dPrice = dPrice
        u.oPrice = oPrice
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
