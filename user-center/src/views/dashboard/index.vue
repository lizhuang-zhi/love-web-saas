<template>
  <div class="content">
    <h2>网站介绍</h2>
    <n-divider></n-divider>
    <div class="introduce" :class="{ 'slide-left': isSlide }">
      <div style="margin-bottom: 15px">
        Love Web 一款您用来表白的适用利器,
        利用网站的优势兼具在手机和电脑多端进行展示,
        让另一半能够随时查看您对他(她)的爱, 用心制作, 用爱守护, 妈啦,
        我实在编不下去了...
      </div>
      <div>* 网站停供对文字、图片和视频内容的编辑展示</div>
      <div>* 炫彩配色, 简约搭配, 新颖方式</div>
      <div>* 一次编辑, 随处访问</div>
    </div>
    <!-- 显示主体 -->
    <n-space vertical align="center" :size="distance" class="main-box">
      <!-- 炫彩主题风格 -->
      <n-space align="center" :class="{ 'slide-right': isSlide }">
        <div class="pic-part">
          <img
            src="https://tva1.sinaimg.cn/large/e6c9d24ely1h2fannncc9j21ha0qsmzp.jpg"
            alt=""
            srcset=""
          />
        </div>
        <div class="word-part" style="margin-left: 40px">
          <h2>炫彩主题风格</h2>
          <div class="desc">多彩轮播显示，精美文字配图</div>
        </div>
      </n-space>
      <!-- 相爱时间 -->
      <n-space
        align="center"
        :class="{ 'slide-left': isSlide }"
        style="flex-direction: row-reverse"
      >
        <div class="pic-part">
          <img
            src="https://tva1.sinaimg.cn/large/e6c9d24ely1h2fansxjxqj21h90qvgma.jpg"
            alt=""
            srcset=""
          />
        </div>
        <div class="word-part" style="margin-right: 40px">
          <h2>相爱点滴</h2>
          <div class="desc">记录与你在一起的每分每秒</div>
        </div>
      </n-space>
      <!-- 共同回忆 -->
      <n-space align="center" :class="{ 'slide-right': isSlide }">
        <div class="pic-part">
          <img
            src="https://tva1.sinaimg.cn/large/e6c9d24ely1h2fanw86jfj21hc0qtq6w.jpg"
            alt=""
            srcset=""
          />
        </div>
        <div class="word-part" style="margin-left: 40px">
          <h2>回忆存放地</h2>
          <div class="desc">和那个他（她）的美好回忆</div>
        </div>
      </n-space>
    </n-space>
    <h2>视频讲解</h2>
    <n-divider></n-divider>
    <!-- 教学视频 -->
    <n-space vertical align="center" class="video-teach">
      <div class="pic-part">
        <iframe
          id="sbrxp"
          src="//player.bilibili.com/player.html?aid=11200262&cid=18527724&page=1"
          scrolling="no"
          border="0"
          frameborder="no"
          framespacing="0"
          allowfullscreen="true"
          style="width: 680px; height: 420px; max-width: 100%"
        >
        </iframe>
      </div>
    </n-space>
    <!-- 作者链接 -->
    <n-space justify="space-between" class="link">
        <a href="https://github.com/lizhuang-zhi" target="blank">
            <div class="author">
                <div style="margin-right: 3px;">Author: Mr.KLeo</div>
                <svg t="1653145283577" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1971" width="13" height="13"><path d="M719.168 207.168L576 64h384v384l-150.272-150.272-264.128 264.064-90.496-90.496 264.064-264.128zM192 960H64V64h384v128H192v640h640V576h128v384H192z" fill="#8a8a8a" p-id="1972"></path></svg>
            </div>
        </a>    
      <div class="project-time">Comletion Time: 2022.5.25</div>
    </n-space>
  </div>
</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { NSpace, NDivider } from "naive-ui";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "Dashboard",
  components: {
    NSpace,
    NDivider,
  },
  setup() {
    const { t } = useI18n();
    // 渐入动画
    const isSlide = ref(false);

    onMounted(() => {
      // 添加动画
      isSlide.value = true;
    });

    onBeforeUnmount(() => {
      // 卸掉动画
      isSlide.value = false;
    });

    return {
      isSlide,
      t,
      distance: ref(140),
    };
  },
});
</script>

<style scoped lang="scss">
.content {
  padding: 40px 150px 60px;
  .introduce {
    font-size: 15px;
  }
  .main-box {
    margin: 70px 0 120px;
    .pic-part {
      box-shadow: 0px 0px 20px 5px #ccc;
      img {
        width: 450px;
      }
    }
  }
  .video-teach {
    padding: 30px 0 100px;
  }
  .link {
      .author {
          display: flex;
          align-items: center;
      }
  }
}
.slide-left {
  -webkit-animation: slide-left 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-left 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.slide-right {
  -webkit-animation: slide-right 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-right 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
/**
 * ----------------------------------------
 * animation slide-left
 * ----------------------------------------
 */
@-webkit-keyframes slide-left {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-200px);
    transform: translateX(-200px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
@keyframes slide-left {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-200px);
    transform: translateX(-200px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
/**
 * ----------------------------------------
 * animation slide-right
 * ----------------------------------------
 */
@-webkit-keyframes slide-right {
  0% {
    opacity: 0;
    -webkit-transform: translateX(200px);
    transform: translateX(200px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
@keyframes slide-right {
  0% {
    opacity: 0;
    -webkit-transform: translateX(200px);
    transform: translateX(200px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
/**
 * ----------------------------------------
 * animation slide-in-blurred-top
 * ----------------------------------------
 */
@-webkit-keyframes slide-in-blurred-top {
  0% {
    -webkit-transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
    transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
    -webkit-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) scaleY(1) scaleX(1);
    transform: translateY(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
}
@keyframes slide-in-blurred-top {
  0% {
    -webkit-transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
    transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
    -webkit-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) scaleY(1) scaleX(1);
    transform: translateY(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
}
</style>
