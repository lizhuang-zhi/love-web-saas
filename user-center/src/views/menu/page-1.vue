<template>
  <h2>第一页 - 网站首页</h2>
  <div class="container">
    <n-divider />
    <n-space vertical align="center" :size="distance">
      <n-space align="center">
        网站主题:
        <n-input
          v-model:value="themeContent"
          type="text"
          size="large"
          placeholder="网站主题"
        />
      </n-space>
      <n-space align="center">
        网站描述:
        <n-input
          v-model:value="description"
          type="text"
          size="large"
          placeholder="网站描述"
        />
      </n-space>
      <n-space align="center">
        按钮文本:
        <n-input
          v-model:value="btnContent"
          type="text"
          size="large"
          placeholder="按钮文本内容"
        />
      </n-space>
      <n-space>
        <n-button strong secondary @click="clearContent"> 清空设置 </n-button>
        <n-button strong secondary type="primary" @click="saveContent">
          保存设置
        </n-button>
      </n-space>
    </n-space>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { NInput, NSpace, NDivider, NButton } from "naive-ui";

export default defineComponent({
  components: {
    NInput,
    NSpace,
    NDivider,
    NButton,
  },
  setup() {
    const themeContent = ref("");
    const description = ref("");
    const btnContent = ref("");

    onMounted(() => {
      // 从数据库获取文本初始值
      themeContent.value = "放开爱网站";
      description.value = "嘎嘎和壮壮的网站";
      btnContent.value = "放上来鼠标";
    });

    // 清空设置
    const clearContent = () => {
      themeContent.value = "";
      description.value = "";
      btnContent.value = "";
    };

    // 保存设置
    const saveContent = () => {
      // 发送请求, 保存第一页设置内容
    };

    return {
      themeContent,
      description,
      btnContent,
      clearContent,
      saveContent,
      // 每行间距大小
      distance: ref(18)
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
