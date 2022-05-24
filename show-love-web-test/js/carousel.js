var crouseIndex = 0; //全局变量
//定义一个变量用来获取轮播的过程
var crouseTime;
$(function () {
    //1.页面加载后,找到Class等于swapImg的第一个对象，让它显示，它的兄弟元素隐藏
    $(".swapImg").eq(0).show().siblings().hide();
    // showTime();
    //当我点击左右切换
    $(".btnLeft").click(function () {
        //1.点击之前要停止轮播
        clearInterval(crouseTime);
        //点了之后，-1
        if (crouseIndex == 0) {
            crouseIndex = 5;
        }
        crouseIndex--;
        show();
    });
    $(".btnRight").click(function () {
        //1.点击之前要停止轮播
        clearInterval(crouseTime);
        //点了之后，-1
        if (crouseIndex == 4) {
            crouseIndex = -1;
        }
        crouseIndex++;
        show();
    });
});

function show() {
    //slideDown(1000)slideUp(1000)淡出，过滤时间1s
    $(".swapImg").eq(crouseIndex).slideDown(1000).siblings().slideUp(1300);
    $(".tab").eq(crouseIndex).addClass("bg").siblings().removeClass("bg");
}