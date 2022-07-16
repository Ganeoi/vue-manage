<template>
  <div class="manage">
    <!-- 使用对话框dialog 组件 -->
    <!-- title 判断 显示不同的title -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <!-- 拿到数据赋值给formLabel : 将拿到数据传入给form : inline设置默认的布局方式-->
      <common-form 
        :formLabel="opertateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      >
      <slot name="new"></slot>
      </common-form>
      <!-- 给弹窗添加自定义的底部 :type="primary" 信息类型的按钮 -->
      <div slot="footer" class="dialog-footer">
        <!-- isShow 判断弹窗是否弹出 -->
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <!-- 引入组件 : searchForm为我们传入的数据-->
      <common-form 
      :formLabel="formLabel"
      :form="searchForm"
      :inline="true"
      ref="form"
      >
        <!-- 点击搜索按钮时 调用getList 方法 -->
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>
    <!-- 引入commontable组件 并传入对应的数据-->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>
<script>
import CommonForm from '../../src/components/CommonForm.vue'
import CommonTable from '../../src/components/CommonTable.vue'
// 引入接口
import { getUser } from '../../api/data'
export default {
  name: 'User',
  components: {
    CommonForm,
    CommonTable
  },
  data () {
    return {
      operateType: 'add',
      isShow: false,
      // 将配置的数据进行传入弹出框
      opertateFormLabel: [
          {
              model: 'name',
              label: '姓名',
              type: 'input'
          },
          {
              model: 'userID',
              label: '用户ID',
              type: 'input'
          },
          {
              model: 'birth',
              label: '注册时间',
              type: 'date'
          },
          {
              model: 'age',
              label: '年龄',
              type: 'input'
          },
          {
              model: 'sex',
              label: '性别',
              type: 'select',
              opts: [
                  {
                      label: '男',
                      value: 1
                  },
                  {
                      label: '女',
                      value: 0
                  }
              ]
          }
      ],
      // 在commonform 表单组件中，当修改表单元素时，就会通过数据双向绑定的原则，同步修改父组件传入的数据
      operateForm: {
        name: '',
        userID: '',
        age: '',
        birth: '',
        sex:'',
      },
      formLabel: [
        {
          model: 'keyword',
          label: '',
          type: 'input'
        }
      ],
      //
      searchForm: {
        keyword: ''
      },
      tableData: [],
      // 表头上需要获取展示的信息
      tableLabel: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'userID',
          label: '用户ID',
          width: 200
        },
        {
          prop: 'birth',
          label: '注册时间',
          width: 200
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sexLabel',
          label: '性别'
        },
      ],
      config: {
        // 设置默认值
        page: 1,
        total: 30
      }
    }
  },
  methods: {
    // 在点击新增和编辑时都会出现弹框， 在点击确认按钮后 对当前弹框是点击新增还是编辑弹出的 进行判断
    confirm() {
      // 判断当前弹窗的状态是新增还是编辑
      if(this.operateType === 'edit') {
        // 如果是编辑，则调用编辑的接口
        this.$http.post('/user/edit', this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
        })
      } else {
        // 如果是新增，则调用新增的接口
        this.$http.post('/user/add', this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
        })
      }
    },
    addUser() {
      this.isShow = true
      // 默认为新增
      this.operateType = 'add'
      // 初始化form数据
      this.operateForm = {
        name: '',
        userID: '',
        age: '',
        birth: '',
        sex:'',
      }
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    delUser(row) {
      this.$confirm("此操作将永久删除该信息！是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const id = row.id
        this.$http.get("/user/del", {
          params: { id }
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          // 调用更新数据
          this.getList()
        })
      })
    },
    //  点击搜索按钮后调用 列表更新的逻辑？？ 接收的name是输入 搜索框中的内容 
    getList(name = '') {
        this.config.loading = true
        // 对传入name进行判断是否存在，如果存在则进行搜索？ 如果存在就置为1，如果不存在就为空
        name ? (this.config.page = 1 ) : ''

        // getUser是接口调用名称；直接调用接口
        getUser({
          page: this.config.page,
          name
        }).then(({ data: res }) => {  // 拿到接口的回调 ，res为接口的响应值
          this.tableData = res.list.map(item => {
            item.sexLabel = item.sex === 0 ? "女" : "男"
            return item
          })
          // 处理分页数据
          this.config.total = res.count
          this.config.loading = false
        })
    }
  },
  // 对一加载页面就需要调用的方法在生命周期中进行调用
  created() {
    this.getList()
  }
}
</script>
<style lang="less" scoped>
.manage-header {
  // 两个组件左右两边靠边
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>