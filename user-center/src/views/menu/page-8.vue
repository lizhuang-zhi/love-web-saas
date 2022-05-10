<template>
  <h2>第八页 - 我们的相册</h2>
  <h4>从相册中获取前五张图片,放置此页面</h4>
  <!-- 主体 -->
  <div class="container">
    <n-divider />
    <n-upload
      action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
      :default-file-list="previewFileList"
      list-type="image-card"
      @preview="handlePreview"
    />
  </div>
  <!-- 预览框 -->
  <n-modal
    v-model:show="showModal"
    preset="card"
    style="width: 600px"
    title="一张很酷的图片"
  >
    <img :src="previewImageUrl" style="width: 100%" />
  </n-modal>
</template>

<script>
import { defineComponent, ref } from "vue";
import { NUpload, NDivider, NModal } from "naive-ui";

export default defineComponent({
  components: {
    NUpload,
    NDivider,
    NModal,
  },
  setup() {
    const showModalRef = ref(false);
    const previewImageUrlRef = ref("");
    function handlePreview(file) {
      const { url } = file;
      previewImageUrlRef.value = url;
      showModalRef.value = true;
    }
    return {
      handlePreview,
      showModal: showModalRef,
      previewImageUrl: previewImageUrlRef,
      previewFileList: ref([
        {
          id: "react",
          name: "我是react.png",
          status: "finished",
          url: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
        },
        {
          id: "vue",
          name: "我是vue.png",
          status: "finished",
          url: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
        },
      ]),
    };
  },
});
</script>

<style scoped>
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
