import {
    onBeforeUnmount,
    onMounted,
    ref
} from "vue";
/* 
    自定义 hook 函数 => 封装部分工具类
*/
export default function () {
    // 切取显示的文件名 
    /* 
        8s9dkdifjxmsndk-js.png => js.png
        8s9dkdifjxmsndk-js-good.png => js-good.png
     */
    const splitFileName = (fileName) => {
        let showFileName = "";
        let arr = fileName.split("-");
        if(arr.length == 2) {
            showFileName = arr[1];
        }else if(arr.length > 2) {
            for(let i = 1; i < arr.length; i++) {
                showFileName += arr[i];
                if(i < arr.length - 1) {
                    showFileName += "-";
                }
            }
        }
        return showFileName;
    }

    return {
        splitFileName
    }
}