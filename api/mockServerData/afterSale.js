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
      refund: Mock.Random.string('number', 19, 19),
      account: Mock.Random.string('number', 11, 11),
      amount: Mock.Random.float(5, 300, 2, 2),
      bNumber: Mock.Random.string('upper', 13, 13),
      apply: Mock.Random.datetime(),
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
  getAfterSaleList: config => {
    const { refund, page = 1, limit = 20 } = param2Obj(config.url)
    console.log('name:' + refund, 'page:' + page, '分页大小limit:' + limit)
    const mockList = List.filter(afterSale => {
      if (refund && afterSale.refund.indexOf(refund) === -1 && afterSale.apply.indexOf(refund) === -1) return false
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
   * @param refund, apply, bNumber, amount, account
   * @return {{code: number, data: {message: string}}}
   */
  createAfterSale: config => {
    const { bNumber, apply, refund, amount, account } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    List.unshift({
      id: Mock.Random.guid(),
      bNumber: bNumber,
      apply: apply,
      refund: refund,
      amount: amount,
      account: account,
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
  deleteAfterSale: config => {
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
   * @param id, bNumber, apply, refund, amount, account
   * @return {{code: number, data: {message: string}}}
   */
  updateAfterSale: config => {
    const { id, bNumber, apply, refund, amount, account } = JSON.parse(config.body)
    List.some(u => {
      if (u.id === id) {
        u.bNumber = bNumber
        u.apply = apply
        u.refund = refund
        u.amount = amount
        u.account = account
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