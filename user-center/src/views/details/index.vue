<template>
  <h2>其他 - 网站其他设置</h2>
  <n-spin size="large" :show="loading">
    <div class="container">
      <n-divider />
      <n-space vertical>
        <n-space align="center">
          标签栏主题:
          <n-input
            v-model:value="headTitle"
            type="text"
            size="large"
            placeholder="请输入.."
          />
        </n-space>
        <n-space>
          <help-button
            picSrc="https://tva1.sinaimg.cn/large/e6c9d24ely1h2jiu3hfwuj218h0u078e.jpg"
            place="left-start"
            heightValue="445"
            widthValue="570"
          />
          <n-button strong secondary type="primary" @click="saveContent">
            {{ btnText }}
          </n-button>
        </n-space>
      </n-space>

      <div class="more">
        更多功能, 敬请期待... (妈啦, 这不是客套话诶, 真有在开发的诶, 嘿嘿)
      </div>
    </div>
  </n-spin>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { NDivider, NSpin, NSpace, NInput, NButton, useNotification } from "naive-ui";
import { GetInfo, UpdateInfo, CreateInfo } from "@/api/detailsPage";
import { useStore } from "vuex";
import useReduceFn from "@/hooks/useReduceFn";
import HelpButton from "@/components/HelpButton.vue";

export default defineComponent({
  components: {
    NDivider,
    NSpin,
    NSpace,
    NInput,
    NButton,
    HelpButton
  },
  setup() {
    const Store = useStore();
    const loading = ref(true);
    const headTitle = ref("");
    // 确认按钮文本
    const btnText = ref("");
    const notification = useNotification();

    // 定义消息通知
    const notify = (type, message) => {
      notification[type]({
        content: message,
        duration: 1500,
      });
    };

    onMounted(async () => {
      // 从数据库获取文本初始值
      let result = await GetInfo({
        userId: Store.state.user.userid,
      });
      console.log(result);
      let data = result.data;
      if (data) {
        // 之前已经设置过
        headTitle.value = data.headTitle;
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
        // 发送请求, 保存设置内容
        result = await CreateInfo({
          userId: Store.state.user.userid,
          headTitle: headTitle.value,
        });
        btnText.value = "修改设置";
      } else if (btnText.value == "修改设置") {
        result = await UpdateInfo({
          userId: Store.state.user.userid,
          headTitle: headTitle.value,
        });
      }
      console.log(result);
      if (result.status == 200) {
        notify("success", result.message);
      }
      loading.value = false;
    };

    return {
      loading,
      saveContent,
      tipEvent,
      headTitle,
      btnText,
    };
  },
});
</script>

<style scoped lang="scss">
h2 {
  padding: 80px 0 0;
  text-align: center;
}
.container {
  width: 600px;
  margin: 0 auto;
  padding: 10px 30px;
  .more {
    margin: 50px 0 100px; 
  }
}
</style>
