// 作为mock的入口文件，配置请求的接口地址，提交方式，返回的模拟数据，对axios请求进行拦截
import Mock from 'mockjs'
// 模块的方式，引入回调函数
import homeApi from './mockServerData/home'
import userApi from './mockServerData/user'
import permissionApi from './mockServerData/permission'
import mallApi from './mockServerData/mall'
import indentApi from './mockServerData/indent'
import afterSaleApi from './mockServerData/afterSale'


// 拦截器的相关规则 编写
// 调用mock模拟的数据
Mock.mock('/home/getData', homeApi.getStatisticalData)

// 定义接口拦截器：通过对接口的拦截，进行数据的模拟
// Mock.mock( rurl, rtype, template )  * rurl:请求的接口地址 rtype:提交方式 template:返回数据
// 第一个参数，这里通过正则方法来实现
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/del/, 'get', userApi.deleteUser)
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)
Mock.mock(/mall\/add/, 'post', mallApi.createMall)
Mock.mock(/mall\/edit/, 'post', mallApi.updateMall)
Mock.mock(/mall\/getMall/, 'get', mallApi.getMallList)
Mock.mock(/mall\/del/, 'get', mallApi.deleteMall)
Mock.mock(/indent\/add/, 'post', indentApi.createIndent)
Mock.mock(/indent\/edit/, 'post', indentApi.updateIndent)
Mock.mock(/indent\/getIndent/, 'get', indentApi.getIndentList)
Mock.mock(/indent\/del/, 'get', indentApi.deleteIndent)
Mock.mock(/afterSale\/add/, 'post', afterSaleApi.createAfterSale)
Mock.mock(/afterSale\/edit/, 'post', afterSaleApi.updateAfterSale)
Mock.mock(/afterSale\/getAfterSale/, 'get', afterSaleApi.getAfterSaleList)
Mock.mock(/afterSale\/del/, 'get', afterSaleApi.deleteAfterSale)

