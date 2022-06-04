<template>
  <n-spin size="large" :show="loading">
    <div class="container">
      <!-- 你好, username -->
      <div class="header">
        <h3>{{ t("common.hi") }}, {{ username }}</h3>
      </div>
      <n-divider />
      <!-- 用户信息 -->
      <n-space vertical align="center" :size="distance">
        <n-space align="center">
          id值:
          <n-input
            v-model:value="userid"
            type="text"
            size="large"
            placeholder="请输入.."
            readonly
          />
        </n-space>
        <n-space align="center">
          邮箱:
          <n-input
            v-model:value="email"
            type="text"
            size="large"
            placeholder="请输入.."
            readonly
          />
        </n-space>
        <n-space align="center">
          性别:
          <n-input
            v-model:value="gender"
            type="text"
            size="large"
            placeholder="请输入.."
            readonly
          />
        </n-space>
        <n-space align="center">
          用户:
          <n-input
            v-model:value="username"
            type="text"
            size="large"
            placeholder="请输入.."
          />
        </n-space>
        <n-space align="center">
          密码:
          <n-input
            v-model:value="password"
            type="text"
            size="large"
            placeholder="请输入.."
          />
        </n-space>
        <n-space>
          <n-button strong secondary type="primary" @click="saveContent">
            {{ btnText }}
          </n-button>
        </n-space>
      </n-space>
      <n-divider />
      <!-- 登出账户 -->
      <p>
        <a @click="handleLogOut">
          <n-button strong secondary type="primary">
            {{
              cancelable ? t("common.confirm") : t("common.sign_out") + "账户"
            }}
          </n-button>
        </a>
        <template v-if="cancelable">
          ,
          <n-button strong secondary type="warning" @click="cancleLogOut">
            {{ t("common.cancel") }}
          </n-button>
        </template>
      </p>
    </div>
  </n-spin>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// import { mapState } from "@/store/mapStore";
import { useI18n } from "vue-i18n";
import {
  NInput,
  NSpace,
  NDivider,
  NButton,
  NSpin,
  useNotification,
  NPopover,
} from "naive-ui";
import useReduceFn from "@/hooks/useReduceFn";
import { UpdateUserInfo } from "@/api/user";

export default defineComponent({
  name: "User",
  components: {
    NInput,
    NSpace,
    NDivider,
    NButton,
    NSpin,
    NPopover,
  },
  setup() {
    const Store = useStore();
    const Router = useRouter();
    const username = ref("");
    const password = ref("");
    const email = ref("");
    const userid = ref("");
    const gender = ref("");
    const loading = ref(true);
    // 确认按钮文本
    const btnText = ref("修改信息");
    const notification = useNotification();
    const { t } = useI18n();
    let cancelable = ref(false);

    onMounted(() => {
      userid.value = Store.state.user.userid;
      username.value = Store.state.user.username;
      password.value = Store.state.user.password;
      email.value = Store.state.user.email;
      gender.value = Store.state.user.gender === 1 ? "男" : "女";
      loading.value = false;
    });

    // 定义消息通知
    const notify = (type, message) => {
      notification[type]({
        content: message,
        duration: 1500,
      });
    };

    // 注销
    function handleLogOut() {
      if (cancelable.value) {
        Store.commit("user/USER_LOGOUT");
        Router.push("/login");
      } else {
        cancelable.value = true;
      }
    }
    // 取消注销
    function cancleLogOut() {
      cancelable.value = false;
    }

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
      if (btnText.value == "修改信息") {
        // 发送请求, 保存第一页设置内容
        result = await UpdateUserInfo({
          userId: userid.value,
          username: username.value,
          password: password.value,
        });
      }
      console.log(result);
      if (result.status == 200) {
        notify("success", result.message);
      }
      loading.value = false;
    };

    return {
      cancelable,
      //   ...mapState(Store.state.user, ["username"]),
      handleLogOut,
      cancleLogOut,
      t,
      btnText,
      username,
      password,
      email,
      userid,
      gender,
      saveContent,
      loading,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 400px;
  margin: 0 auto;
  padding: 50px 30px 40px;
}
</style>
