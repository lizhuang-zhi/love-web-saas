import {
    onBeforeUnmount,
    onMounted,
    ref
} from "vue";
import { useNotification } from "naive-ui"
/* 
    自定义 hook 函数 => 复用节流函数
*/
export default function () {
    // 点击保存设置的开始时间
    let startTime = ref(0);

    const notification = useNotification();
    // 定义消息通知
    const notify = (type, message) => {
        notification[type]({
            content: message,
            duration: 1300,
        });
    };
    // 保存设置/修改设置
    const saveSetting = async (fn) => {
        let currentTime = Date.now();
        if (currentTime - startTime.value > 5000) {
            // 调用API,发送请求
            await fn();
            startTime.value = Date.now();
        } else {
            notify("warning", "操作过于频繁, 请稍后再试");
        }
    };
    onMounted(() => {
        startTime = ref(0);
    })
    onBeforeUnmount(() => {
        startTime = ref(0);
    })

    return {
        saveSetting
    }
}