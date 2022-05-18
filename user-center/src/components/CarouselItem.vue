<template>
  <n-space align="center">
    <!-- 左侧 -->
    <n-space vertical :size="distance">
      <n-space align="center">
        描述:
        <n-input
          v-model:value="itemData.leftTopDesc"
          type="text"
          placeholder="请输入.."
        />
      </n-space>
      <n-space align="center">
        描述:
        <n-input
          v-model:value="itemData.leftBottomDesc"
          type="text"
          placeholder="请输入.."
        />
      </n-space>
      <n-space align="center">
        主题:
        <n-input
          v-model:value="itemData.leftTitle"
          type="text"
          placeholder="请输入.."
        />
      </n-space>
    </n-space>
    <!-- 右侧 -->
    <n-space vertical>
      <n-space>
        配图:
        <n-upload
          :action="apiBaseUrlUpload"
          :headers="headers"
          :data="uploadData"
          :default-file-list="previewFileList"
          list-type="image-card"
          max="1"
          accept=".jpg,.jpeg,.png"
          @before-upload="beforeUpload"
          @remove="removeSingleFile"
          @finish="handleFinish"
        />
      </n-space>
      <n-space align="center">
        主题:
        <n-input
          v-model:value="itemData.rightTitle"
          type="text"
          placeholder="请输入.."
        />
      </n-space>
      <n-space align="center">
        描述:
        <n-input
          v-model:value="itemData.rightDesc"
          type="text"
          placeholder="请输入.."
        />
      </n-space>
    </n-space>
  </n-space>
</template>

<script>
import { defineComponent, onMounted, ref, reactive, watch } from "vue";
import {
  NCarousel,
  NInput,
  NSpace,
  NUpload,
  NModal,
  NButton,
  useNotification,
  useMessage,
} from "naive-ui";
import { API_BASE_URL } from "@/settings.js";
import { useStore } from "vuex";
import { DelFileSingle } from "@/api/fourthPage";

export default defineComponent({
  name: "CarouselItem",
  components: {
    NCarousel,
    NInput,
    NSpace,
    NUpload,
    NModal,
    NButton,
  },
  props: ["picIndex", "itemData"],
  setup(props, { emit }) {
    // 上传文件请求地址
    const apiBaseUrlUpload = API_BASE_URL + "/upload/4";
    const Store = useStore();
    const message = useMessage();
    const notification = useNotification();
    const previewFileList = reactive([]);

    // 定义消息通知
    const notify = (type, message) => {
      notification[type]({
        content: message,
        duration: 1500,
      });
    };

    // 上传文件时, 携带上userid
    const headers = reactive({
      ["Authorization"]: localStorage.getItem("token"),
    });
    // 上传文件时, 携带上userid
    const uploadData = reactive({
      userId: "",
    });

    onMounted(() => {
      // 初始化用户id
      uploadData.userId = Store.state.user.userid;
      // 获取图片url
      let url = props.itemData.fileObj.url;
      if (url == "") {
        previewFileList.pop();
      }
    });

    // 文件上传前的限制
    const beforeUpload = (data) => {
      // 512000bit == 500KB
      if (data.file.file?.size >= 512000) {
        message.error("限制图片大小为500KB以内，请重新上传");
        return false;
      }
      return true;
    };
    // 删除文件
    const removeSingleFile = async ({ file, fileList }) => {
      // 获取最新的文件名
      const fileName = props.itemData.fileObj.name;
      console.log(fileName);
      let result = await DelFileSingle({
        fileName: fileName,
      });
      console.log(result);
      // 同时还要更新响应式数组里的数据
      props.itemData.fileObj.url = "";
      if (result.status == 200) {
        notify("success", result.message);
      }
    };
    // 完成文件上传回调函数
    const handleFinish = ({ file, event }) => {
      // 响应文本
      const responseJSON = (event?.target).response;
      const response = JSON.parse(responseJSON);
      console.log(response);
      if (response.status == 200) {
        message.success(response.message);
        // 改变父组件中对应元素的文件名
        // 获取新的文件名
        let newFileName = response.data.fileName;
        let picIndex = props.picIndex;
        console.log(newFileName);
        emit("updateFileName", {
          newFileName,
          picIndex,
        });
      } else {
        message.error(response.message);
      }
      return file;
    };

    watch(
      [
        () => props.itemData.fileObj.url,
        () => props.itemData.fileObj.name,
        () => props.itemData.fileObj.id,
      ],
      ([url, name, id]) => {
        if (url != "") {
          previewFileList[0] = {
            name: name,
            url: url,
            status: "finished",
            id: id,
          };
        }
      },
      { immediate: true, deep: true }
    );

    return {
      apiBaseUrlUpload,
      headers,
      uploadData,
      previewFileList,
      beforeUpload,
      removeSingleFile,
      handleFinish,
      // 间隔距离
      distance: ref(36),
    };
  },
});
</script>

<style>
</style>