<template>
  <n-popover :placement="place" trigger="click">
    <template #trigger>
      <n-button strong secondary @click="tipEvent"> 书写帮助 </n-button>
    </template>
    <div :style="{ width: widthValue + 'px', height: heightValue + 'px' }">
      <img :src="picSrc" alt="" srcset="" />
      <ul style="margin: 10px 0 0 20px">
        <li>* 输入内容与图片提示方位基本一致</li>
        <li>* 输入后, 请及时保存输入内容</li>
      </ul>
    </div>
  </n-popover>
</template>

<script>
import { defineComponent, ref } from "vue";
import { NPopover, NButton } from "naive-ui";

export default defineComponent({
  name: "CarouselItem",
  components: {
    NPopover,
    NButton,
  },
  props: {
    picSrc: {
      type: String,
      default:
        "https://tva1.sinaimg.cn/large/e6c9d24ely1h2bv8ow31xj21170lgju2.jpg",
    },
    place: {
      type: String,
      default: "left-start",
    },
    heightValue: {
      type: Number,
      default: 360,
    },
    widthValue: {
      type: Number,
      default: 540,
    },
  },
  setup() {
    const showPopover = ref(false);
    // 书写帮助
    const tipEvent = async () => {
      showPopover.value = true;
    };
    return {
      tipEvent,
      showPopover,
    };
  },
});
</script>

<style scoped lang="scss">
</style>