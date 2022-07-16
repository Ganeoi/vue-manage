<template>
  <div class="manage">
    <!-- 使用对话框组件 (弹出框)-->
    <el-dialog
      :title="operateType === 'add' ? '添加商品' : '更新数据'"
      :visible.sync="isShow"
    >
      <!-- 拿到数据赋值给formLabel: 将拿到数据传入给form-->
      <common-form
        :formLabel="opertateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <!-- 给弹窗添加自定义的底部 :type="primary" 信息类型的按钮 -->
      <div slot="footer" class="dialog-footer">
        <!-- isShow 判断弹窗是否弹出 -->
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addMall">+ 新增</el-button>
      <!-- 引入组件 : searchForm为我们传入的数据-->
      <common-form
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <!-- 引入commontable组件 并传入对应的数据-->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editMall"
      @del="delMall"
    ></common-table>
  </div>
</template>
<script>
import CommonForm from "../../src/components/CommonForm.vue";
import CommonTable from "../../src/components/CommonTable.vue";
// 引入接口
import { getMall } from "../../api/data";
export default {
  name: "Mall",
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
          model: "isbn",
          label: "图书编号",
          type: "input",
        },
        {
          model: "oPrice",
          label: "原价",
          type: "input",
        },
        {
          model: "dPrice",
          label: "折扣价",
          type: "input",
        },
        {
          model: "number",
          label: "剩余数量/本",
          type: "input",
        },
        {
          model: "update",
          label: "更新时间",
          type: "datetime",
        },
      ],
      // 在commonform组件中，当修改表单元素时，就会通过数据双向绑定的原则，修改父组件传入的数据
      operateForm: {
        number: "",
        update: "",
        isbn: "",
        dPrice: "",
        oPrice: "",
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
      // 表头上需要获取展示的信息
      tableLabel: [
        {
          prop: "isbn",
          label: "图书编号",
          width: 200,
        },
        {
          prop: "oPrice",
          label: "原价",
        },
        {
          prop: "dPrice",
          label: "折扣价",
        },
        {
          prop: "number",
          label: "剩余数量/本",
        },
        {
          prop: "update",
          label: "更新时间",
          width: 320,
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
        this.$http.post("/mall/edit", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      } else {
        // 如果是新增，则调用新增的接口
        this.$http.post("/mall/add", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      }
    },
    addMall() {
      this.isShow = true;
      // 默认为新增
      this.operateType = "add";
      // 初始化form数据
      this.operateForm = {
        number: "",
        update: "",
        isbn: "",
        dPrice: "",
        oPrice: "",
      };
    },
    editMall(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    delMall(row) {
      this.$confirm("此操作将永久删除该信息！是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http
          .get("/mall/del", {
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
    getList(isbn = "") {
      this.config.loading = true;
      // 对输入搜索框的 isbn 进行判断是否存在，如果存在就置为1，如果不存在就为空
      isbn ? (this.config.page = 1) : "";
      console.log(isbn, "isbn");

      // 直接调用接口
      getMall({
        page: this.config.page,
        isbn,
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
  },
};
</script>
<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>