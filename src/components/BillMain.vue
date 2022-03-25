<template>
  <div class="bill-main">
    <add-bill text="添加账单" class="add-bill"></add-bill>
    <div class="amount">
      <div>支出金额：{{ amountPay }}</div>
      <div>收入金额：{{ amountRevenue }}</div>
    </div>
    <el-table :data="billData" stripe height="94vh" style="width: 46%">
      <el-table-column
        prop="time"
        label="time"
        align="center"
        width="180"
        :filters="[
          { text: '一月份', value: '0' },
          { text: '二月份', value: '1' },
          { text: '三月份', value: '2' },
          { text: '四月份', value: '3' },
          { text: '五月份', value: '4' },
          { text: '六月份', value: '5' },
          { text: '七月份', value: '6' },
          { text: '八月份', value: '7' },
          { text: '九月份', value: '8' },
          { text: '十月份', value: '9' },
          { text: '十一月', value: '10' },
          { text: '十二月', value: '11' },
        ]"
        :filter-method="filterTime"
      />
      <el-table-column
        prop="category"
        label="category"
        align="center"
        width="240"
        :filters="[
          { text: '旅游', value: '旅游' },
          { text: '房贷', value: '房贷' },
          { text: '车贷', value: '车贷' },
          { text: '交通', value: '交通' },
          { text: '车辆保养', value: '车辆保养' },
          { text: '房屋租赁', value: '房屋租赁' },
          { text: '家庭用品', value: '家庭用品' },
          { text: '日常饮食', value: '日常饮食' },
          { text: '工资', value: '工资' },
          { text: '股票投资', value: '股票投资' },
          { text: '基金投资', value: '基金投资' },
        ]"
        :filter-method="filterCategories"
      />
      <el-table-column
        prop="amount"
        label="amount"
        align="center"
        width="200"
        :sort-method="amountSort"
        sortable
      />
      <el-table-column prop="type" label="type" align="center" width="240" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { onUpdated } from "vue";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { ref } from "vue";
interface User {
  month: number;
  time: string;
  category: string;
  amount: number;
  type: string;
}

//选择的月份和分类,默认为全选
let monthFilter = ref(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]);
let categoriesFilter = ref([
  "旅游",
  "房贷",
  "车贷",
  "交通",
  "车辆保养",
  "房屋租赁",
  "家庭用品",
  "日常饮食",
  "工资",
  "股票投资",
  "基金投资",
]);

//排序函数
const amountSort = (x, y) => {
  if (x.type === "收入" && y.type === "支出") {
    return 1;
  } else {
    return x.amount - y.amount > 0 ? 1 : -1;
  }
};

//选择月份后按下confirm执行的函数,会在筛选的同时改变选择表
const filterTime = (value: string, row: User, column: TableColumnCtx<User>) => {
  monthFilter.value = monthFilterProxy.value;

  if (monthFilter.value.indexOf(value) === -1) {
    monthFilter.value.push(value);
  }
  return row.month.toString() === value;
};

//选择分类后按下confirm执行的函数,会在筛选的同时改变选择表
const filterCategories = (value: string, row: User, column: TableColumnCtx<User>) => {
  categoriesFilter.value = categoriesFilterProxy.value;

  if (categoriesFilter.value.indexOf(value) === -1) {
    categoriesFilterProxy.value.push(value);
  }
  return row.category === value;
};

//代理,防止改变原选择表触发computed使金额清零
let categoriesFilterProxy = ref([]);
let monthFilterProxy = ref([]);

//获取reset按钮的引用,在按下reset按钮的时候使选择表变为全选即默认状态。同时在每一个更新周期后将代理置空，保证下一次选择。
onUpdated(() => {
  //获取reset按钮的引用
  const buttonsMonth = document.getElementsByClassName("el-table-filter__bottom")[0]
    .childNodes;
  const buttonsCategories = document.getElementsByClassName("el-table-filter__bottom")[1]
    .childNodes;
  const buttonsMonthReset = buttonsMonth[1];
  const buttonsCategoriesReset = buttonsCategories[1];
  //将选择表变为默认状态
  function filterCategoriesReset() {
    categoriesFilter.value = [
      "旅游",
      "房贷",
      "车贷",
      "交通",
      "车辆保养",
      "房屋租赁",
      "家庭用品",
      "日常饮食",
      "工资",
      "股票投资",
      "基金投资",
    ];
  }
  //将选择表变为默认状态
  function filterMonthReset() {
    monthFilter.value = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
  }

  buttonsMonthReset.addEventListener("click", filterMonthReset);
  buttonsCategoriesReset.addEventListener("click", filterCategoriesReset);

  //代理置空
  categoriesFilterProxy.value = [];
  monthFilterProxy.value = [];
});
</script>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { defineComponent } from "vue";
import { ElTableColumn, ElTable } from "element-plus";
import AddBill from "./AddBill.vue";

export default defineComponent({
  name: "BillMain",
  components: {
    AddBill,
    ElTableColumn,
    ElTable,
  },
  data() {
    return {
      billData: this.$store.state.billData,
    };
  },
  computed: {
    //依据选择表计算支出金额
    amountPay() {
      let sum = 0;
      this.billData.forEach((e) => {
        if (
          this.monthFilter.indexOf(e.month.toString()) !== -1 &&
          this.categoriesFilter.indexOf(e.category) !== -1 &&
          e.type === "支出"
        ) {
          sum += e.amount;
        }
      });
      return sum;
    },
    //依据选择表计算收入金额
    amountRevenue() {
      let sum = 0;
      this.billData.forEach((e) => {
        if (
          this.monthFilter.indexOf(e.month.toString()) !== -1 &&
          this.categoriesFilter.indexOf(e.category) !== -1 &&
          e.type === "收入"
        ) {
          sum += e.amount;
        }
      });
      return sum;
    },
  },
});
</script>

<style lang="scss" scoped>
.bill-main {
  .el-table {
    position: relative;
    min-width: 50vw;
    margin: 0 auto;
  }
  .add-bill {
    position: absolute;
    top: 1.375rem;
    right: 22%;
    z-index: 2;
  }
  .amount {
    position: absolute;
    top: 20px;
    z-index: 2;
    left: 16%;
    font-size: 17px;
    div:last-child {
      margin-top: 6px;
    }
  }
}
</style>
