<template>
  <h2>第二页 - 对象的视频</h2>

  <div class="container">
    <n-divider />
    <n-space vertical :size="distance">
      <n-upload
        action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
        :headers="{
          'naive-info': 'hello!',
        }"
        :data="{
          'naive-data': 'cool! naive!',
        }"
      >
        <n-button>上传文件</n-button>
      </n-upload>
      <n-space align="center">
        视频上方显示文字:
        <n-input
          v-model:value="description"
          type="text"
          size="large"
          placeholder="请输入.."
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
import { NInput, NButton, NDivider, NSpace } from "naive-ui";

export default defineComponent({
  components: {
    NInput,
    NButton,
    NDivider,
    NSpace,
  },
  setup() {
    return {
      // 行间距大小
      distance: ref(18),
    };
  },
});
</script>

<style scoped>
h2 {
  padding: 80px 0 0;
  text-align: center;
}
</style>
