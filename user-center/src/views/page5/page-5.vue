<template>
  <h2>第五页 - 与你相识</h2>
  <n-spin :show="loading" size="large">
    <div class="container">
      <n-divider />
      <n-space vertical :size="distance">
        <n-space align="center">
          相识开始时间:
          <n-date-picker
            v-model:value="timeStamp"
            type="datetime"
            clearable
            @update:value="onChangeTime"
          />
        </n-space>
      </n-space>
      <!-- 按钮 -->
      <n-space style="margin-top: 20px" justify="start">
        <!-- 书写提示 -->
        <help-button
          picSrc="https://tva1.sinaimg.cn/large/e6c9d24ely1h2bv2exaj8j20vj0l9gm5.jpg"
          place="left-start"
          heightValue="425"
        />
        <n-button strong secondary type="primary" @click="saveTime">
          {{ btnText }}
        </n-button>
      </n-space>
    </div>
  </n-spin>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import {
  NDivider,
  NSpace,
  NButton,
  NDatePicker,
  useNotification,
  NSpin,
} from "naive-ui";
import { CreateInfo, GetInfo, UpdateInfo } from "@/api/fifthPage";
import { useStore } from "vuex";
import useReduceFn from "@/hooks/useReduceFn";
import HelpButton from "@/components/HelpButton.vue";

export default defineComponent({
  components: {
    NDivider,
    NSpace,
    NButton,
    NDatePicker,
    NSpin,
    HelpButton,
  },
  setup() {
    const Store = useStore();
    const notification = useNotification();
    const loading = ref(false);
    // 初始化时间
    const timeStamp = ref(1621459200000);
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
        timeStamp.value = Number(data.timeStamp);
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
        duration: 1800,
      });
    };
    // 时间改动
    const onChangeTime = (value) => {
      timeStamp.value = value;
    };
    const { saveSetting } = useReduceFn();
    //点击按钮保存时间事件
    const saveTime = async () => {
      loading.value = true;
      await saveSetting(save);
      loading.value = false;
    };
    const save = async () => {
      if (timeStamp.value > Date.now()) {
        notify("error", "选择的时间不能超过当前日期, 请重新选择");
        return;
      }
      let result = null;
      // 用户之前没有设置过
      if (btnText.value == "保存设置") {
        result = await CreateInfo({
          userId: Store.state.user.userid,
          timeStamp: String(timeStamp.value),
        });
        btnText.value = "修改设置";
      } else if (btnText.value == "修改设置") {
        result = await UpdateInfo({
          userId: Store.state.user.userid,
          timeStamp: String(timeStamp.value),
        });
      }
      console.log(result);
      if (result.status == 200) {
        notify("success", result.message);
      }
    };
    return {
      timeStamp,
      distance: ref(20),
      onChangeTime,
      saveTime,
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
</style>
