<<<<<<< HEAD
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">保存</el-button>
      </div>
    </el-dialog>
    <!--  顶部的tabs标签页组件 -->
    <template>
      <el-tabs v-model="activeName" @tab-click="cut">
        <el-tab-pane label="全部（156）" name="first"></el-tab-pane>
        <el-tab-pane label="待处理（37）" name="second"></el-tab-pane>
        <el-tab-pane label="退货中（21）" name="third"></el-tab-pane>
        <el-tab-pane label="已处理（83）" name="fourth"></el-tab-pane>
        <el-tab-pane label="已拒绝（15）" name="fifth"></el-tab-pane>
      </el-tabs>
    </template>
    <!-- 引入commontable组件 并传入对应的数据-->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editAfterSale"
      @del="delAfterSale"
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
import { getAfterSale } from "../../api/data";
export default {
  name: "afterSale",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      activeName: 'first',
      // 将配置的数据进行传入 在弹出框中显示
      opertateFormLabel: [
        {
          model: "refund",
          label: "退款单号",
          type: "input",
        },
        {
          model: "account",
          label: "退款账号",
          type: "input",
        },
        {
          model: "amount",
          label: "退货金额",
          type: "input",
        },
        {
          model: "bNumber",
          label: "退货图书编号",
          type: "input",
        },
        {
          model: "apply",
          label: "申请时间",
          type: "input",
        },
      ],
      operateForm: {
        bNumber: "",
        apply: "",
        refund: "",
        amount: "",
        account: "",
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
      tableLabel: [
        {
          prop: "refund",
          label: "退款单号",
          width: 200,
        },
        {
          prop: "account",
          label: "退款账号",
        },
        {
          prop: "amount",
          label: "退货金额",
        },
        {
          prop: "bNumber",
          label: "退货图书编号",
          width: 300
        },
        {
          prop: "apply",
          label: "申请时间",
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
    cut() {
        console.log('ajks')
      },
    confirm() {
      // 判断当前弹窗的状态是新增还是编辑
      if (this.operateType === "edit") {
        // 如果是编辑，则调用编辑的接口
        this.$http.post("/afterSale/edit", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      } else {
        // 如果是新增，则调用新增的接口
        this.$http.post("/afterSale/add", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      }
    },
    addAfterSale() {
      this.isShow = true;
      // 默认为新增
      this.operateType = "add";
      // 初始化form数据
      this.operateForm = {
        bNumber: "",
        apply: "",
        refund: "",
        amount: "",
        account: "",
      };
    },
    editAfterSale(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    delAfterSale(row) {
      this.$confirm("此操作将永久删除该信息！是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http
          .get("/afterSale/del", {
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
    getList(refund = "") {
      this.config.loading = true;
      refund ? (this.config.page = 1) : "";

      // 直接调用接口
      getAfterSale({
        page: this.config.page,
        refund,
      }).then(({ data: res }) => {
        this.tableData = res.list.map((item) => {
          return item;
        });
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: right; 
  align-items: right;
}  
=======
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">保存</el-button>
      </div>
    </el-dialog>
    <!--  顶部的tabs标签页组件 -->
    <template>
      <el-tabs v-model="activeName" @tab-click="cut">
        <el-tab-pane label="全部（156）" name="first"></el-tab-pane>
        <el-tab-pane label="待处理（37）" name="second"></el-tab-pane>
        <el-tab-pane label="退货中（21）" name="third"></el-tab-pane>
        <el-tab-pane label="已处理（83）" name="fourth"></el-tab-pane>
        <el-tab-pane label="已拒绝（15）" name="fifth"></el-tab-pane>
      </el-tabs>
    </template>
    <!-- 引入commontable组件 并传入对应的数据-->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editAfterSale"
      @del="delAfterSale"
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
import { getAfterSale } from "../../api/data";
export default {
  name: "afterSale",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      activeName: 'first',
      // 将配置的数据进行传入 在弹出框中显示
      opertateFormLabel: [
        {
          model: "refund",
          label: "退款单号",
          type: "input",
        },
        {
          model: "account",
          label: "退款账号",
          type: "input",
        },
        {
          model: "amount",
          label: "退货金额",
          type: "input",
        },
        {
          model: "bNumber",
          label: "退货图书编号",
          type: "input",
        },
        {
          model: "apply",
          label: "申请时间",
          type: "input",
        },
      ],
      operateForm: {
        bNumber: "",
        apply: "",
        refund: "",
        amount: "",
        account: "",
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
      tableLabel: [
        {
          prop: "refund",
          label: "退款单号",
          width: 200,
        },
        {
          prop: "account",
          label: "退款账号",
        },
        {
          prop: "amount",
          label: "退货金额",
        },
        {
          prop: "bNumber",
          label: "退货图书编号",
          width: 300
        },
        {
          prop: "apply",
          label: "申请时间",
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
    cut() {
        console.log('ajks')
      },
    confirm() {
      // 判断当前弹窗的状态是新增还是编辑
      if (this.operateType === "edit") {
        // 如果是编辑，则调用编辑的接口
        this.$http.post("/afterSale/edit", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      } else {
        // 如果是新增，则调用新增的接口
        this.$http.post("/afterSale/add", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      }
    },
    addAfterSale() {
      this.isShow = true;
      // 默认为新增
      this.operateType = "add";
      // 初始化form数据
      this.operateForm = {
        bNumber: "",
        apply: "",
        refund: "",
        amount: "",
        account: "",
      };
    },
    editAfterSale(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    delAfterSale(row) {
      this.$confirm("此操作将永久删除该信息！是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http
          .get("/afterSale/del", {
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
    getList(refund = "") {
      this.config.loading = true;
      refund ? (this.config.page = 1) : "";

      // 直接调用接口
      getAfterSale({
        page: this.config.page,
        refund,
      }).then(({ data: res }) => {
        this.tableData = res.list.map((item) => {
          return item;
        });
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: right; 
  align-items: right;
}  
>>>>>>> ada1ce3e28e10678653f4fcdd6c8a602d691b7cc
</style>