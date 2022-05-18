<template>
  <h2>第一页 - 网站首页</h2>
  <n-spin size="large" :show="loading">
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
          <help-button
            picSrc="https://tva1.sinaimg.cn/large/e6c9d24ely1h2botc85zij213k0l8wgc.jpg"
            place="left-start"
            heightValue="365"
            widthValue="570"
          />
          <n-button strong secondary type="primary" @click="saveContent">
            {{ btnText }}
          </n-button>
        </n-space>
      </n-space>
    </div>
  </n-spin>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import {
  NInput,
  NSpace,
  NDivider,
  NButton,
  NSpin,
  useNotification,
  NPopover,
} from "naive-ui";
import { GetInfo1, UpdateInfo1, CreateInfo1 } from "@/api/firstPage";
import { useStore } from "vuex";
import useReduceFn from "@/hooks/useReduceFn";
import HelpButton from "@/components/HelpButton.vue";

export default defineComponent({
  components: {
    NInput,
    NSpace,
    NDivider,
    NButton,
    NSpin,
    NPopover,
    HelpButton,
  },
  setup() {
    const Store = useStore();
    const loading = ref(true);
    const themeContent = ref("");
    const description = ref("");
    const btnContent = ref("");
    const notification = useNotification();
    const showPopover = ref(false);
    // 确认按钮文本
    const btnText = ref("");

    // 定义消息通知
    const notify = (type, message) => {
      notification[type]({
        content: message,
        duration: 1300,
      });
    };

    onMounted(async () => {
      // 从数据库获取文本初始值
      let result = await GetInfo1({
        userId: Store.state.user.userid,
      });
      console.log(result);
      let data = result.data;
      if (data) {
        // 之前已经设置过
        themeContent.value = data.themeContent;
        description.value = data.description;
        btnContent.value = data.btnContent;
        btnText.value = "修改设置";
      } else {
        // 用户还未设置过
        btnText.value = "保存设置";
      }
      loading.value = false;
    });

    // 书写帮助
    const tipEvent = async () => {
      showPopover.value = true;
    };
    // 使用 hook 自定义函数
    const { saveSetting } = useReduceFn();
    // 保存设置/修改设置
    const saveContent = async () => {
      loading.value = true;
      await saveSetting(save);
      loading.value = false;
    };
    const save = async () => {
      let result = null;
      if (btnText.value == "保存设置") {
        // 发送请求, 保存第一页设置内容
        result = await CreateInfo1({
          userId: Store.state.user.userid,
          themeContent: themeContent.value,
          description: description.value,
          btnContent: btnContent.value,
        });
        btnText.value = "修改设置";
      } else if (btnText.value == "修改设置") {
        result = await UpdateInfo1({
          userId: Store.state.user.userid,
          themeContent: themeContent.value,
          description: description.value,
          btnContent: btnContent.value,
        });
      }
      console.log(result);
      if (result.status == 200) {
        notify("success", result.message);
      }
      loading.value = false;
    };

    return {
      btnText,
      loading,
      themeContent,
      description,
      btnContent,
      saveContent,
      tipEvent,
      // 每行间距大小
      distance: ref(18),
    };
  },
});
</script>

<style scoped lang="scss">
h2 {
  padding: 80px 0 0;
  text-align: center;
}
</style>
