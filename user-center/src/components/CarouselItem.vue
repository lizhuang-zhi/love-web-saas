<template>
  <n-space align="center">
    <!-- 左侧 -->
    <n-space vertical :size="distance">
      <n-space align="center">
        描述:
        <n-input v-model:value="value" type="text" placeholder="请输入.." />
      </n-space>
      <n-space align="center">
        描述:
        <n-input v-model:value="value" type="text" placeholder="请输入.." />
      </n-space>
      <n-space align="center">
        主题:
        <n-input v-model:value="value" type="text" placeholder="请输入.." />
      </n-space>
    </n-space>
    <!-- 右侧 -->
    <n-space vertical>
      <n-space>
        配图:
        <n-upload
          action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
          :default-file-list="previewFileList"
          list-type="image-card"
          max="1"
          @preview="handlePreview"
        />
      </n-space>
      <n-space align="center">
        主题:
        <n-input v-model:value="value" type="text" placeholder="请输入.." />
      </n-space>
      <n-space align="center">
        描述:
        <n-input v-model:value="value" type="text" placeholder="请输入.." />
      </n-space>
    </n-space>
  </n-space>
  <n-space style="margin-top: 20px;" justify="center">
    <n-button strong secondary @click="clearContent"> 清空设置 </n-button>
    <n-button strong secondary type="primary" @click="saveContent">
      保存设置
    </n-button>
  </n-space>
  <!-- 照片查看框 -->
  <n-modal
    v-model:show="showModal"
    preset="card"
    style="width: 600px"
    title="一张很酷的图片"
  >
    <img :src="previewImageUrl" style="width: 100%" />
  </n-modal>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import { NCarousel, NInput, NSpace, NUpload, NModal, NButton } from "naive-ui";

export default defineComponent({
  name: "CarouselItem",
  components: {
    NCarousel,
    NInput,
    NSpace,
    NUpload,
    NModal,
    NButton
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
          id: "vue",
          name: "我是vue.png",
          status: "finished",
          url: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
        },
      ]),
      // 间隔距离
      distance: ref(36),
    };
  },
});
</script>

<style>
</style>