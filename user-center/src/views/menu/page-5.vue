<template>
  <h2>第五页 - 与你相识</h2>
  <div class="container">
    <n-divider />
    <n-space vertical :size="distance">
      <n-space align="center">
        相识开始时间:
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
import { NDivider, NSpace, NButton, NDatePicker } from "naive-ui";

export default defineComponent({
  components: {
    NDivider,
    NSpace,
    NButton,
    NDatePicker,
  },
  setup() {
    // 初始化时间
    const timestamp = ref(1621459200000);
    // 时间改动
    const onChangeTime = (v) => {
      console.log(v);
    }
    return {
      timestamp,
      distance: ref(20),
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
