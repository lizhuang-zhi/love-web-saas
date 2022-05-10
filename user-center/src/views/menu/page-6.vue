<template>
  <h2>第六页 - 心形表白内容</h2>
  <div class="container">
    <n-divider />
    <n-space vertical align="center" :size="distance">
      <n-space align="center">
        主题 :
        <n-input
          v-model:value="themeContent"
          type="text"
          size="large"
          placeholder="建议输入主题.."
        />
      </n-space>
      <n-space align="center">
        <n-space align="center">
          描述1-1:
          <n-input
            v-model:value="themeContent"
            type="text"
            size="large"
            placeholder="请输入.."
          />
        </n-space>
        <n-space align="center">
          描述1-2:
          <n-input
            v-model:value="themeContent"
            type="text"
            size="large"
            placeholder="请输入.."
          />
        </n-space>
      </n-space>
      <n-space align="center">
        描述2:
        <n-input
          class="desc-2"
          v-model:value="themeContent"
          type="text"
          size="large"
          placeholder="请输入.."
        />
      </n-space>
      <n-space align="center">
        描述3:
        <n-input
          class="desc-3"
          v-model:value="themeContent"
          type="text"
          size="large"
          placeholder="请输入.."
        />
      </n-space>
      <n-space align="center">
        描述4:
        <n-input
          class="desc-4"
          v-model:value="description"
          type="text"
          size="large"
          placeholder="请输入.."
        />
      </n-space>
      <n-space align="center">
        描述5:
        <n-input
          class="desc-5"
          v-model:value="btnContent"
          type="text"
          size="large"
          placeholder="请输入.."
        />
      </n-space>
      <n-space align="center">
        描述6:
        <n-input
          class="desc-6"
          v-model:value="btnContent"
          type="text"
          size="large"
          placeholder="请输入.."
        />
      </n-space>
      <n-space align="center">
        描述7:
        <n-input
          class="desc-7"
          v-model:value="btnContent"
          type="text"
          size="large"
          placeholder="建议输入名字.."
        />
      </n-space>
      <n-space>
        <n-button class="save-btn" strong secondary type="primary" @click="saveContent">
          保存设置
        </n-button>
      </n-space>
    </n-space>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { NInput, NSpace, NDivider, NButton, NConfigProvider } from "naive-ui";

export default defineComponent({
  components: {
    NDivider,
    NInput,
    NSpace,
    NButton,
    NConfigProvider,
  },
  setup() {
    return {
      distance: ref(20),
    };
  },
});
</script>

<style scoped>
h2 {
  padding: 80px 0 0;
  text-align: center;
}
.container {
  width: 90%;
  margin: 0 auto;
  padding: 10px 30px;
}
.desc-2 {
  width: 520px;
}
.desc-3 {
  width: 620px;
}
.desc-4 {
  width: 550px;
}
.desc-5 {
  width: 420px;
}
.desc-6 {
  width: 320px;
}
.desc-7 {
  width: 170px;
}
.save-btn {
  margin: 5px 0 0 30px;
}
</style>
