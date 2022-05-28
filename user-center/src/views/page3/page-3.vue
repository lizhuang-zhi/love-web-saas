<template>
  <h2>第三页 - 你的视频</h2>

  <n-spin size="large" :show="loading">
    <div class="container">
      <n-divider />
      <n-space vertical :size="distance">
        <n-upload
          :action="apiBaseUrlUpload"
          max="1"
          :data="data"
          :headers="headers"
          accept="video/mp4,.mov"
          v-model:file-list="fileList"
          @finish="handleFinish"
          @before-upload="beforeUpload"
          @remove="removeFile"
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
      </n-space>
    </div>
    <n-space style="margin-top: 20px" justify="center">
      <!-- 书写提示 -->
      <help-button
        picSrc="https://tva1.sinaimg.cn/large/e6c9d24ely1h2bu6f50qij213r0lhdks.jpg"
        place="left-start"
        heightValue="355"
      />
      <!-- 确认修改 -->
      <n-button strong secondary type="primary" @click="saveContent">
        {{ btnText }}
      </n-button>
    </n-space>
  </n-spin>
</template>

<script>
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
} from "vue";
import {
  NInput,
  NButton,
  NDivider,
  NSpace,
  NSpin,
  NUpload,
  useNotification,
  useMessage,
  NPopover,
} from "naive-ui";
import useReduceFn from "@/hooks/useReduceFn";
import useTools from "@/hooks/useTools";
import { useStore } from "vuex";
import { CreateInfo, GetInfo, UpdateInfo, DelFile } from "@/api/thirdPage";
import { API_BASE_URL } from "@/settings.js";
import HelpButton from "@/components/HelpButton.vue"

export default defineComponent({
  components: {
    NInput,
    NButton,
    NDivider,
    NSpace,
    NSpin,
    NUpload,
    NPopover,
    HelpButton
  },
  setup() {
    const apiBaseUrlUpload = API_BASE_URL + "/upload/3";
    const loading = ref(false);
    const Store = useStore();
    const btnText = ref("保存设置");
    const description = ref("");
    const notification = useNotification();
    const message = useMessage();
    const showPopover = ref(false);
    // 上传的视频文件
    const fileName = ref("");
    // 上传文件时, 携带上userid
    const data = reactive({
      userId: "",
    });
    // 上传文件时, 携带上userid
    const headers = reactive({
      ["Authorization"]: localStorage.getItem("token"),
    });
    // 显示的已上传文件列表
    const fileList = ref([]);

    const { splitFileName } = useTools();

    onMounted(async () => {
      // 初始化用户id
      data.userId = Store.state.user.userid;
      // 从数据库获取文本初始值
      let result = await GetInfo({
        userId: Store.state.user.userid,
      });
      console.log(result);
      let res = result.data;
      if (res) {
        // 之前已经设置过
        description.value = res.upText;
        // 切取显示的文件名
        let splitStr = splitFileName(res.fileName);
        if (res.fileName !== "") {
          fileList.value[0] = {
            name: splitStr,
            url: res.fileUrl,
            status: "finished",
          };
        }
        fileName.value = res.fileName;
        btnText.value = "修改设置";
      } else {
        // 用户还未设置过
        btnText.value = "保存设置";
      }
      loading.value = false;
    });

    onBeforeUnmount(async () => {
      // 清理掉服务器中还没有清理掉的对应文件
      let res = await DelFile({
        userId: Store.state.user.userid,
      });
      console.log(res);
    });

    // 定义消息通知
    const notify = (type, message) => {
      notification[type]({
        content: message,
        duration: 1500,
      });
    };

    // 书写帮助
    const tipEvent = async () => {
      showPopover.value = true;
    };

    // 文件上传前的限制
    const beforeUpload = (data) => {
      // 5242880bit == 5MB
      if (data.file.file?.size >= 5242880) {
        message.error("限制视频大小为5MB以内，建议剪辑后上传, 这样会小一些");
        return false;
      }
      return true;
    };

    // 完成文件上传回调函数
    const handleFinish = ({ file, event }) => {
      // 响应文本
      const responseJSON = (event?.target).response;
      const response = JSON.parse(responseJSON);
      console.log(response);
      if (response.status == 200) {
        message.success(response.message);
        file.status = "finished";
        fileName.value = Store.state.user.userid + "-" + file.name;
      } else {
        message.error(response.message + ",请稍后重试");
        file.status = "error";
      }
      console.log(file);
      return file;
    };

    // 删除文件回调
    const removeFile = async () => {
      fileName.value = "";
    };

    const { saveSetting } = useReduceFn();

    // 保存设置/修改设置
    const saveContent = async () => {
      loading.value = true;
      await saveSetting(save);
      loading.value = false;
    };
    const save = async () => {
      let result = null;
      // 用户之前没有设置过
      if (btnText.value == "保存设置") {
        result = await CreateInfo({
          userId: Store.state.user.userid,
          upText: description.value,
          fileName: fileName.value,
        });
        btnText.value = "修改设置";
      } else if (btnText.value == "修改设置") {
        result = await UpdateInfo({
          userId: Store.state.user.userid,
          upText: description.value,
          fileName: fileName.value,
        });
      }
      console.log(result);
      if (result.status == 200) {
        notify("success", result.message);
      }
    };

    return {
      apiBaseUrlUpload,
      loading,
      btnText,
      description,
      // 行间距大小
      distance: ref(18),
      saveContent,
      handleFinish,
      beforeUpload,
      fileList,
      data,
      headers,
      removeFile,
      tipEvent,
      showPopover,
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
