<template>
  <h2>第八页 - 我们的相册</h2>
  <h4>从相册中获取前六张图片,放置此页面</h4>
  <n-spin size="large" :show="loading">
    <!-- 主体 -->
    <div class="container">
      <n-divider />
      <n-upload
        :action="apiBaseUrlUploadAlbum"
        :headers="headers"
        :data="uploadData"
        :default-file-list="FileList"
        list-type="image-card"
        max="15"
        accept=".jpg,.jpeg,.png"
        @finish="handleFinish"
        @before-upload="beforeUpload"
        @remove="removeFile"
      />
      <!-- 按钮 -->
      <n-space style="margin-top: 20px" justify="center">
        <!-- 书写提示 -->
        <help-button
          picSrc="https://tva1.sinaimg.cn/large/e6c9d24ely1h2bvp0s912j213y0lvjuh.jpg"
          place="bottom-start"
          heightValue="395"
          widthValue="600"
        />
        <n-button style="margin: 30px 0 0 20px" strong secondary type="primary" @click="saveContent">
          {{ btnText }}
        </n-button>
      </n-space>
    </div>
  </n-spin>
</template>

<script>
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
  onBeforeUnmount,
} from "vue";
import {
  NUpload,
  NDivider,
  NModal,
  NButton,
  useMessage,
  NSpin,
  useNotification,
} from "naive-ui";
import { API_BASE_URL } from "@/settings.js";
import useReduceFn from "@/hooks/useReduceFn";
import { CreateInfo, GetInfo, UpdateInfo, DelFile } from "@/api/eighthPage";
import { useStore } from "vuex";
import HelpButton from "@/components/HelpButton.vue";

export default defineComponent({
  components: {
    NUpload,
    NDivider,
    NModal,
    NButton,
    NSpin,
    HelpButton,
  },
  setup() {
    // 上传文件请求地址
    const apiBaseUrlUploadAlbum = API_BASE_URL + "/upload/album";
    const loading = ref(false);
    const btnText = ref("保存设置");
    const message = useMessage();
    const notification = useNotification();
    const Store = useStore();
    const fileName = ref("");
    // 上传文件时, 携带上userid
    const uploadData = reactive({
      userId: "",
    });
    // 上传文件时, 携带上userid
    const headers = reactive({
      ["Authorization"]: localStorage.getItem("token"),
    });
    // 文件列表
    const FileList = ref([]);

    onMounted(async () => {
      // 初始化用户id
      uploadData.userId = Store.state.user.userid;
      // 从数据库获取文本初始值
      let result = await GetInfo({
        userId: Store.state.user.userid,
      });
      console.log(result);
      let data = result.data;
      if (data) {
        // 之前已经设置过
        let fileArr = result.data.fileArr;
        for (let item of fileArr) {
          FileList.value.push(item);
        }
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

    // 文件上传前的限制
    const beforeUpload = (data) => {
      // 512000bit == 500KB
      if (data.file.file?.size >= 512000) {
        message.error("限制图片大小为500KB以内，请重新上传");
        return false;
      }
      // 获取当前上传的文件名
      fileName.value = Store.state.user.userid + "-" + data.file.name;
      // 判断文件是否已经上传
      if (
        FileList.value.some((item) => {
          return item.name == fileName.value;
        })
      ) {
        message.error("该文件已经上传, 请勿重新上传");
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
        // 向 FileList 中添加上传的文件
        const fileObj = {
          id: file.id,
          name: response.data,
          status: "finished",
        };
        FileList.value.push(fileObj);
      } else {
        message.error(response.message);
      }
      console.log(file);
      return file;
    };

    // 删除文件
    const removeFile = async ({ file, fileList }) => {
      // 获取文件名
      const fileName = file.name;
      console.log(fileName);
      // 删除 FileList 中的对应文件对象
      FileList.value = FileList.value.filter((item) => {
        return item.name != fileName;
      });
      console.log(FileList.value);
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
      // 获取FileList文件名数组
      let fileNameList = FileList.value.map((item) => item.name);
      // 获取整个FileList
      let allFileList = FileList.value;
      // 用户之前没有设置过
      if (btnText.value == "保存设置") {
        result = await CreateInfo({
          userId: Store.state.user.userid,
          fileList: fileNameList,
        });
        btnText.value = "修改设置";
      } else if (btnText.value == "修改设置") {
        console.log(allFileList);
        result = await UpdateInfo({
          userId: Store.state.user.userid,
          fileList: allFileList,
        });
      }
      console.log(result);
      if (result.status == 200) {
        notify("success", result.message);
      }
    };

    return {
      loading,
      btnText,
      FileList,
      handleFinish,
      beforeUpload,
      saveContent,
      apiBaseUrlUploadAlbum,
      uploadData,
      removeFile,
      headers,
      distance: ref(30),
    };
  },
});
</script>

<style scoped lang="scss">
h2 {
  padding: 80px 0 0;
  text-align: center;
}
h4 {
  margin-top: 10px;
  text-align: center;
}
.container {
  width: 600px;
  margin: 0 auto;
  padding: 10px 30px;
}
</style>
