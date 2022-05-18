<template>
  <h2>第四页 - 我们的轮播图</h2>
  <n-spin size="large" :show="loading">
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
              <carousel-item
                :picIndex="index"
                :itemData="item"
                @updateFileName="updateFileName"
              ></carousel-item>
            </n-space>
          </div>
        </n-carousel>
      </n-config-provider>
      <n-divider />
    </div>
    <n-space style="margin-top: 20px" justify="center">
      <!-- 书写提示 -->
      <help-button
        picSrc="https://tva1.sinaimg.cn/large/e6c9d24ely1h2abgxktlwj21ck0u0jwk.jpg"
        place="left-start"
        heightValue="370"
        widthValue="500"
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
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from "vue";
import {
  NConfigProvider,
  NDivider,
  NCarousel,
  NSpace,
  NButton,
  NSpin,
  useNotification,
  NPopover,
} from "naive-ui";
import CarouselItem from "@/components/CarouselItem.vue";
import { useStore } from "vuex";
import { GetInfo, CreateInfo, UpdateInfo, DelFile } from "@/api/fourthPage";
import useReduceFn from "@/hooks/useReduceFn";
import HelpButton from "@/components/HelpButton.vue"

export default defineComponent({
  components: {
    NDivider,
    NCarousel,
    NSpace,
    CarouselItem,
    NConfigProvider,
    NButton,
    NSpin,
    NPopover,
    HelpButton
  },
  setup() {
    const Store = useStore();
    const btnText = ref("");
    const loading = ref(false);
    const notification = useNotification();
    const showPopover = ref(false);

    // 获取数据
    let arr = reactive([
      {
        leftTopDesc: "",
        leftBottomDesc: "",
        leftTitle: "",
        rightTitle: "",
        rightDesc: "",
        fileObj: {
          id: "",
          name: "",
          status: "finished",
          url: "",
        },
      },
      {
        leftTopDesc: "",
        leftBottomDesc: "",
        leftTitle: "",
        rightTitle: "",
        rightDesc: "",
        fileObj: {
          id: "",
          name: "",
          status: "finished",
          url: "",
        },
      },
      {
        leftTopDesc: "",
        leftBottomDesc: "",
        leftTitle: "",
        rightTitle: "",
        rightDesc: "",
        fileObj: {
          id: "",
          name: "",
          status: "finished",
          url: "",
        },
      },
      {
        leftTopDesc: "",
        leftBottomDesc: "",
        leftTitle: "",
        rightTitle: "",
        rightDesc: "",
        fileObj: {
          id: "",
          name: "",
          status: "finished",
          url: "",
        },
      },
      {
        leftTopDesc: "",
        leftBottomDesc: "",
        leftTitle: "",
        rightTitle: "",
        rightDesc: "",
        fileObj: {
          id: "",
          name: "",
          status: "finished",
          url: "",
        },
      },
    ]);

    // 组件样式设置
    const themeOverrides = {
      Carousel: {
        dotColor: "#afafaf",
        dotColorActive: "#555",
        arrowColor: "#666",
      },
    };

    // 定义消息通知
    const notify = (type, message) => {
      notification[type]({
        content: message,
        duration: 1300,
      });
    };

    onMounted(async () => {
      let result = await GetInfo({
        userId: Store.state.user.userid,
      });
      console.log(result);
      let res = result.data;
      if (res) {
        // 之前已经设置过
        for (let i = 0; i < res.RotationMap.length; i++) {
          let item = res.RotationMap[i];
          for (let key in item) {
            arr[i][key] = item[key];
          }
        }
        console.log(arr);
        btnText.value = "修改设置";
      } else {
        // 用户还未设置过
        btnText.value = "保存设置";
      }
      loading.value = false;
    });

    onBeforeUnmount(async () => {
      let res = await DelFile({
        userId: Store.state.user.userid,
      });
      console.log(res);
    });

    // 书写帮助
    const tipEvent = async () => {
      showPopover.value = true;
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
          RotationMap: arr,
        });
        btnText.value = "修改设置";
      } else if (btnText.value == "修改设置") {
        console.log(arr);
        result = await UpdateInfo({
          userId: Store.state.user.userid,
          RotationMap: arr,
        });
      }
      console.log(result);
      if (result.status == 200) {
        notify("success", result.message);
      }
    };

    // 上传文件后, 修改数组中对应元素的文件名
    const updateFileName = async ({ newFileName, picIndex }) => {
      arr[picIndex].fileObj.id = picIndex;
      arr[picIndex].fileObj.name = newFileName;
    };

    return {
      arr,
      themeOverrides,
      btnText,
      loading,
      showPopover,
      saveContent,
      updateFileName,
      tipEvent,
    };
  },
});
</script>

<style scoped lang="scss">
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
  height: 300px;
}
.carousel-item-box .n-space {
  height: 100%;
}
</style>
