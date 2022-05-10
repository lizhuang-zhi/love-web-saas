<template>
  <h2>第七页 - 与你相爱</h2>
  <div class="container">
    <n-divider />
    <n-space vertical :size="distance">
      <n-space align="center">
        爱情开始时间:
        <n-date-picker
          v-model:value="timestamp"
          type="datetime"
          clearable
          @update:value="onChangeTime"
        />
      </n-space>
      <n-button strong secondary type="primary" @click="saveContent">
        保存设置
      </n-button>
    </n-space>
  </div>

</template>

<script>
import { defineComponent, ref } from "vue";
import { NDivider, NSpace, NButton, NDatePicker, c } from "naive-ui";

export default defineComponent({
  components: {
    NDivider,
    NSpace,
    NButton,
    NDatePicker,
  },
  setup() {
    // 初始时间
    const timestamp = ref(1652131200000)
    // 修改时间事件
    const onChangeTime = (v) => {
      console.log(v);
    }
    return {
      timestamp,
      onChangeTime
    }
  },
});
</script>

<style scoped>
h2 {
  padding: 80px 0 0;
  text-align: center;
}
</style>
