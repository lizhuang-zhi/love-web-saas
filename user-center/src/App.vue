<script setup>
import Global from "@/components/Global.vue";
import { NDialogProvider } from "naive-ui";
</script>

<template>
  <Global>
    <n-dialog-provider>
      <router-view />
    </n-dialog-provider>
  </Global>
</template>

<style>
.container {
  width: 400px;
  margin: 0 auto;
  padding: 10px 30px;
}
</style>
