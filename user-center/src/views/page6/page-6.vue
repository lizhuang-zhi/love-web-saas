<template>
  <h2>第六页 - 心形表白内容</h2>
  <n-spin size="large" :show="loading">
    <div class="container">
      <n-divider />
      <n-space vertical align="center" :size="distance">
        <n-space align="center">
          主题 :
          <n-input
            v-model:value="title"
            type="text"
            size="large"
            placeholder="建议输入主题.."
          />
        </n-space>
        <n-space align="center">
          <n-space align="center">
            描述1-1:
            <n-input
              v-model:value="desc11"
              type="text"
              size="large"
              placeholder="请输入.."
            />
          </n-space>
          <n-space align="center">
            描述1-2:
            <n-input
              v-model:value="desc12"
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
            v-model:value="desc2"
            type="text"
            size="large"
            placeholder="请输入.."
          />
        </n-space>
        <n-space align="center">
          描述3:
          <n-input
            class="desc-3"
            v-model:value="desc3"
            type="text"
            size="large"
            placeholder="请输入.."
          />
        </n-space>
        <n-space align="center">
          描述4:
          <n-input
            class="desc-4"
            v-model:value="desc4"
            type="text"
            size="large"
            placeholder="请输入.."
          />
        </n-space>
        <n-space align="center">
          描述5:
          <n-input
            class="desc-5"
            v-model:value="desc5"
            type="text"
            size="large"
            placeholder="请输入.."
          />
        </n-space>
        <n-space align="center">
          描述6:
          <n-input
            class="desc-6"
            v-model:value="desc6"
            type="text"
            size="large"
            placeholder="请输入.."
          />
        </n-space>
        <n-space align="center">
          描述7:
          <n-input
            class="desc-7"
            v-model:value="desc7"
            type="text"
            size="large"
            placeholder="建议输入名字.."
          />
        </n-space>
        <n-space justify="center" align="center"> 
          <!-- 书写提示 -->
          <help-button
            picSrc="https://tva1.sinaimg.cn/large/e6c9d24ely1h2bv8ow31xj21170lgju2.jpg"
            place="left-start"
            heightValue="405"
            widthValue="600"
          />
          <n-button
            class="save-btn"
            strong
            secondary
            type="primary"
            @click="saveContent"
          >
            {{ btnText }}
          </n-button>
        </n-space>
      </n-space>
    </div>
  </n-spin>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import {
  NInput,
  NSpace,
  NDivider,
  NButton,
  NConfigProvider,
  NSpin,
  useNotification,
} from "naive-ui";
import useReduceFn from "@/hooks/useReduceFn";
import { CreateInfo, GetInfo, UpdateInfo } from "@/api/sixthPage";
import { useStore } from "vuex";
import HelpButton from "@/components/HelpButton.vue"

export default defineComponent({
  components: {
    NDivider,
    NInput,
    NSpace,
    NButton,
    NConfigProvider,
    NSpin,
    HelpButton
  },
  setup() {
    const title = ref("");
    const desc11 = ref("");
    const desc12 = ref("");
    const desc2 = ref("");
    const desc3 = ref("");
    const desc4 = ref("");
    const desc5 = ref("");
    const desc6 = ref("");
    const desc7 = ref("");

    const Store = useStore();
    const loading = ref(true);
    const notification = useNotification();

    // 确认按钮文本
    const btnText = ref("");

    onMounted(async () => {
      // 从数据库获取文本初始值
      let result = await GetInfo({
        userId: Store.state.user.userid,
      });
      console.log(result);
      let data = result.data;
      if (data) {
        // 之前已经设置过
        title.value = data.title;
        desc11.value = data.desc11;
        desc12.value = data.desc12;
        desc2.value = data.desc2;
        desc3.value = data.desc3;
        desc4.value = data.desc4;
        desc5.value = data.desc5;
        desc6.value = data.desc6;
        desc7.value = data.desc7;
        btnText.value = "修改设置";
      } else {
        // 用户还未设置过
        btnText.value = "保存设置";
      }
      loading.value = false;
    });

    // 定义消息通知
    const notify = (type, message) => {
      notification[type]({
        content: message,
        duration: 1300,
      });
    };

    const { saveSetting } = useReduceFn();

    // 保存设置/修改设置
    const saveContent = async () => {
      loading.value = true;
      await saveSetting(save);
      loading.value = false;
    };
    // 保存 API
    const save = async () => {
      let result = null;
      // 用户之前没有设置过
      if (btnText.value == "保存设置") {
        result = await CreateInfo({
          userId: Store.state.user.userid,
          title: title.value,
          desc11: desc11.value,
          desc12: desc12.value,
          desc2: desc2.value,
          desc3: desc3.value,
          desc4: desc4.value,
          desc5: desc5.value,
          desc6: desc6.value,
          desc7: desc7.value,
        });
        btnText.value = "修改设置";
      } else if (btnText.value == "修改设置") {
        result = await UpdateInfo({
          userId: Store.state.user.userid,
          title: title.value,
          desc11: desc11.value,
          desc12: desc12.value,
          desc2: desc2.value,
          desc3: desc3.value,
          desc4: desc4.value,
          desc5: desc5.value,
          desc6: desc6.value,
          desc7: desc7.value,
        });
      }
      console.log(result);
      if (result.status == 200) {
        notify("success", result.message);
      }
    };

    return {
      title,
      desc11,
      desc12,
      desc2,
      desc3,
      desc4,
      desc5,
      desc6,
      desc7,
      distance: ref(20),
      saveContent,
      loading,
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
</style>
