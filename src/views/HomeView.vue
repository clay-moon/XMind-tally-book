<template>
  <div class="home">
    <BillMain></BillMain>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BillMain from "@/components/BillMain.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    BillMain,
  },
});
</script>
