<template>
  <div class="manage">
    <el-dialog
      title='更改订单信息'
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="opertateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      >
      </common-form>
      <!-- 给弹窗添加自定义的底部 :type="primary" 信息类型的按钮 -->
      <div slot="footer" class="dialog-footer">
        <!-- isShow 判断弹窗是否弹出 -->
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">保存</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <!-- 引入组件 : searchForm为我们传入的数据-->
      <common-form
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
        align="right"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>
    <!-- 引入commontable组件 并传入对应的数据-->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editIndent"
      @del="delIndent"
    >
        <template v-slot:new>
          <el-table-column type="selection" width="50"></el-table-column>
        </template>
    </common-table>
  </div>
</template>
<script>
import CommonForm from "../../src/components/CommonForm.vue";
import CommonTable from "../../src/components/CommonTable.vue";
// 引入接口
import { getIndent } from "../../api/data";
export default {
  name: "Indent",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      // 将配置的数据进行传入 在弹出框中显示
      opertateFormLabel: [
        {
          model: "oNumber",
          label: "订单号",
          type: "input",
        },
        {
          model: "price",
          label: "订单金额",
          type: "input",
        },
        {
          model: "deliver",
          label: "是否发货",
          type: "input",
        },
        {
          model: "address",
          label: "收货地址",
          type: "input",
        },
        {
          model: "time",
          label: "下单时间",
          type: "datetime",
        },
      ],
      // 在commonform组件中，当修改表单元素时，就会通过数据双向绑定的原则，修改父组件传入的数据
      operateForm: {
        address: "",
        time: "",
        oNumber: "",
        deliver: "",
        price: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      //
      searchForm: {
        keyword: "",
      },
      tableData: [],
      // 表头上需要获取展示的信息(并对列的顺序进行排列)
      tableLabel: [
        {
          prop: "oNumber",
          label: "订单号",
          width: 200,
        },
        {
          prop: "price",
          label: "订单金额",
        },
        {
          prop: "deliver",
          label: "是否发货",
        },
        {
          prop: "address",
          label: "收货地址",
          width: 300
        },
        {
          prop: "time",
          label: "下单时间",
          width: 150,
        },
      ],
      config: {
        // 设置默认值
        page: 1,
        total: 30,
      },
    };
  },
  methods: {
    // 点击确认按钮后 进行判断
    confirm() {
      // 判断当前弹窗的状态是新增还是编辑
      if (this.operateType === "edit") {
        // 如果是编辑，则调用编辑的接口
        this.$http.post("/indent/edit", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      } else {
        // 如果是新增，则调用新增的接口
        this.$http.post("/indent/add", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      }
    },
    addIndent() {
      this.isShow = true;
      // 默认为新增
      this.operateType = "add";
      // 初始化form数据
      this.operateForm = {
        address: "",
        time: "",
        oNumber: "",
        deliver: "",
        price: "",
      };
    },
    editIndent(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    delIndent(row) {
      this.$confirm("此操作将永久删除该信息！是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http
          .get("/indent/del", {
            params: { id },
          })
          .then((res) => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            // 调用更新数据
            this.getList();
          });
      });
    },
    // 列表更新的逻辑
    getList(oNumber = "") {
      this.config.loading = true;
      // 对输入搜索框的 oNumber 进行判断是否存在，如果存在？ 如果存在就置为1，如果不存在就为空
      oNumber ? (this.config.page = 1) : "";
      console.log(oNumber, "oNumber");

      // 直接调用接口
      getIndent({
        page: this.config.page,
        oNumber,
      }).then(({ data: res }) => {
        // res为接口的响应值
        console.log(res, "res");
        this.tableData = res.list.map((item) => {
          return item;
        });
        // 处理分页数据
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
  },
  // 对一加载页面就需要调用的方法在生命周期中进行调用
  created() {
    this.getList();
  }
}
</script>
<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: right;
  align-items: center;
}
</style>