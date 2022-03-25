<template>
  <div>
    <el-button @click="addBill" type="info">{{ text }}</el-button>
    <div class="fill-bill">
      <div class="header"><span>账单填写</span></div>
      <el-button class="close" :icon="Close" circle @click="hideBill" />
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
      >
        <el-form-item label="账单日期">
          <el-date-picker
            v-model="formLabelAlign.date"
            type="date"
            placeholder="请选择账单日期"
          />
        </el-form-item>
        <el-form-item label="账单分类">
          <el-select-v2
            v-model="formLabelAlign.categoriesValue"
            :options="optionsCategories"
            placeholder="请选择账单分类"
          />
        </el-form-item>
        <el-form-item label="账单金额">
          <el-input
            class="numberInput"
            v-model="formLabelAlign.amount"
            placeholder="请输入账单金额"
            type="number"
            oninput="if(value.length>10)value=value.slice(0,10)"
          />
        </el-form-item>
        <el-form-item label="账单类型">
          <el-select-v2
            v-model="formLabelAlign.typeValue"
            :options="optionsType"
            placeholder="请选择账单分类"
          />
        </el-form-item>
      </el-form>
      <div class="submit">
        <el-button type="primary" @click="submitNewBill">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Close } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";

const categoriesOptions = [
  "车贷",
  "车辆保养",
  "房贷",
  "房屋租赁",
  "家庭用品",
  "交通",
  "旅游",
  "日常饮食",
  "工资",
  "股票投资",
  "基金投资",
];
const typeOptions = ["收入", "支出"];

const optionsCategories = Array.from({ length: 11 }).map((_, idx) => ({
  value: `${categoriesOptions[idx]}`,
  label: `${categoriesOptions[idx]}`,
}));
const optionsType = Array.from({ length: 2 }).map((_, idx) => ({
  value: `${typeOptions[idx]}`,
  label: `${typeOptions[idx]}`,
}));

const formLabelAlign = reactive({
  date: "",
  categoriesValue: "",
  amount: "",
  typeValue: "",
});
const labelPosition = ref("right");
</script>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { defineComponent } from "vue";
import {
  ElButton,
  ElDatePicker,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelectV2,
} from "element-plus";

export default defineComponent({
  name: "AddBill",
  components: {
    ElButton,
    ElDatePicker,
    ElForm,
    ElFormItem,
    ElInput,
    ElSelectV2,
  },
  props: {
    text: String,
  },
  methods: {
    submitNewBill() {
      //判断用户是否输入
      if (
        this.formLabelAlign.typeValue !== "" &&
        this.formLabelAlign.date !== "" &&
        this.formLabelAlign.categoriesValue !== "" &&
        this.formLabelAlign.amount !== ""
      ) {
        //提交输入数据
        this.$store.commit("addBillData", {
          type: this.formLabelAlign.typeValue,
          time: this.formLabelAlign.date.toLocaleDateString?.(),
          category: this.formLabelAlign.categoriesValue,
          amount: parseInt(this.formLabelAlign.amount),
          month: this.formLabelAlign.date.getMonth?.(),
        });
        //表单复位
        this.formLabelAlign.typeValue = "";
        this.formLabelAlign.date = "";
        this.formLabelAlign.categoriesValue = "";
        this.formLabelAlign.amount = "";
        //提交后隐藏表单
        const bill = document.getElementsByClassName("fill-bill")[0] as HTMLElement;
        bill.style.display = "none";
      }
    },
    //点击添加表单后出现表单
    addBill() {
      const bill = document.getElementsByClassName("fill-bill")[0] as HTMLElement;

      bill.style.display = "block";
    },
    //点击close后隐藏表单
    hideBill() {
      const bill = document.getElementsByClassName("fill-bill")[0] as HTMLElement;
      bill.style.display = "none";
    },
  },
});
</script>

<style lang="scss" scoped>
.fill-bill {
  position: fixed;
  top: 245px;
  left: calc(50% - 225px);
  display: none;
  z-index: 10;
  background-color: #ff8282;
  width: 450px;
  border-radius: 5px;
  height: 300px;
  ::v-deep .el-form-item--default .el-form-item__label {
    color: #fff;
  }
  .header {
    line-height: 50px;
    height: 50px;
    text-align: center;
    color: #fff;
  }
  .close {
    position: absolute;
    top: -14px;
    right: -14px;
  }
  .submit {
    width: 100%;
    .el-button {
      display: block;
      margin: 0 auto;
    }
  }
  ::v-deep .el-input__inner {
    width: 80%;
  }
  .numberInput {
    ::v-deep input::-webkit-outer-spin-button,
    ::v-deep input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
    }
    /* 火狐 */
    ::v-deep input {
      -moz-appearance: textfield;
    }
  }
}
</style>
