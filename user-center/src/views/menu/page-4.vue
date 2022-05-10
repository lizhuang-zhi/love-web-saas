<template>
  <h2>第四页 - 我们的轮播图</h2>
  <div class="container">
    <n-divider />

    <n-config-provider :theme-overrides="themeOverrides">
      <n-carousel show-arrow dot-type="line">
        <div
          class="carousel-item-box"
          v-for="(item, index) in arr"
          :key="index"
        >
          <n-space justify="center" align="center">
            <carousel-item></carousel-item>
          </n-space>
        </div>
      </n-carousel>
    </n-config-provider>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import {
  NConfigProvider,
  NUpload,
  NDivider,
  NModal,
  NCarousel,
  NSpace,
  NButton,
} from "naive-ui";
import CarouselItem from "@/components/CarouselItem.vue";

export default defineComponent({
  components: {
    NUpload,
    NDivider,
    NModal,
    NCarousel,
    NSpace,
    CarouselItem,
    NConfigProvider,
    NButton,
  },
  setup() {
    // 组件样式设置
    const themeOverrides = {
      Carousel: {
        dotColor: "#afafaf",
        dotColorActive: "#555",
        arrowColor: "#666"
      }
    };
    // 虚拟数组数据
    const arr = reactive([{}, {}, {}, {}, {}]);
    return {
      arr,
      themeOverrides,
    };
  },
});
</script>

<style scoped>
h2 {
  padding: 80px 0 0;
  text-align: center;
}
.container {
  width: 700px;
  margin: 0 auto;
  padding: 10px 30px;
}
.carousel-item-box {
  width: 100%;
  height: 440px;
}
.carousel-item-box .n-space {
  height: 100%;
}
</style>
