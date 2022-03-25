// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createStore } from 'vuex'
import bill from '../assets/bill.js' 

interface Bill {
  month: number;
  time: string;
  category: string;
  amount: number;
  type: string;
}

export default createStore({
  state: {
    billData:bill
  },
  getters: {
  },
  mutations: {
    addBillData(state,newBill:Bill) {
      state.billData.push(newBill)
    }
  },
  actions: {
  },
  modules: {
  }
})
