<script>
import Global from "@/components/Global.vue";
import { defineComponent, onMounted } from "vue";
import { NDialogProvider, NNotificationProvider, NMessageProvider } from "naive-ui";
import { useStore } from "vuex";
import { CheckStatus } from "@/api/user";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    Global,
    NDialogProvider,
    NNotificationProvider,
    NMessageProvider
  },
  setup() {
    const Store = useStore();
    const Router = useRouter();
    // 检查用户登录状态, 更新状态
    onMounted(async () => {
      let result = await CheckStatus();
      console.log(result);
      if (result.status == 200) {
        // 更新用户信息
        Store.dispatch("user/INITUSERINFO", result.data);
        Router.push({ name: "Dashboard" });
      }
    });
    return {};
  },
});
</script>

<template>
  <n-message-provider>
    <n-notification-provider>
      <Global>
        <n-dialog-provider>
          <router-view />
        </n-dialog-provider>
      </Global>
    </n-notification-provider>
  </n-message-provider>
</template>

<style>
.container {
  width: 400px;
  margin: 0 auto;
  padding: 10px 30px;
}
</style>
