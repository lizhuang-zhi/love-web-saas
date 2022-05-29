// import fullpage from 'fullpage.js'
import '../css/fullpage.css';
import '../css/index.css';
import '../css/animation.css';
import axios from 'axios';

// 倒计时 runTimer 
let runTimer = null;
// 总结部分的字体添加动效果
const res_words_animation = 'tracking-in-contract-bck-top-res-section';
// 倒计时的字体进入动效
const timer_in_animation = 'tracking-in-contract-bck-bottom';
// video部分的字体进入动效
const video_in_animation = 'focus-in-expand';
// 相识默认时间
let defaultKnowEachTime = 0;
// 相爱默认时间
let defaultLoveEachTime = 0;

// axios 实例
const instance = axios.create({
    baseURL: 'http://116.205.247.150',
    // baseURL: 'http://127.0.0.1:5001',
    timeout: 4000
});
/* 
    获取 localStorage 中用户信息
*/
function checkStorageInfo() {
    let loaclStorageInfo = localStorage.getItem("userInfo");
    // 解析信息
    let userInfo = JSON.parse(loaclStorageInfo);
    return userInfo;
}

/* 
    获取第五页内容 - 相识实践
*/
function updateDomContent5(userInfo) {
    // 发起post请求
    return instance({
        method: 'post',
        url: '/getInfo/5',
        data: {
            userId: userInfo._id
        }
    });
}

/* 
    获取第七页内容 - 相爱时间
*/
function updateDomContent7(userInfo) {
    // 发起post请求
    return instance({
        method: 'post',
        url: '/getInfo/7',
        data: {
            userId: userInfo._id
        }
    });
}

/* 
    获取其他设置
*/
function updateDomContentDetails(userInfo) {
    // 发起post请求
    return instance({
        method: 'post',
        url: '/getInfo/details',
        data: {
            userId: userInfo._id
        }
    });
}
/* 
    修改第一页内容 + 其他设置
*/
async function updateDomContent1() {
    let userInfo = checkStorageInfo();
    if (!userInfo) {
        return;
    }
    // 发起第一页post请求
    let page1_request = instance({
        method: 'post',
        url: '/getInfo/1',
        data: {
            userId: userInfo._id
        }
    });
    let result = await Promise.all([page1_request, updateDomContent5(userInfo), updateDomContent7(userInfo), updateDomContentDetails(userInfo)]);
    // 设置第一页信息
    let getFirstPageInfo = result[0].data.data;
    if (getFirstPageInfo) {
        // 获取主题
        let themeDom = document.getElementById('theme-content-1');
        // 获取描述
        let descDom = document.getElementById('desc-content-1');
        // 获取按钮
        let btnDom = document.getElementById('love-you-btn');
        themeDom.innerText = getFirstPageInfo.themeContent;
        descDom.innerText = getFirstPageInfo.description;
        btnDom.innerText = getFirstPageInfo.btnContent;
    }
    // 第五页 - 设置相识时间
    let getFifthPageInfo = result[1].data.data;
    if (getFifthPageInfo) {
        defaultKnowEachTime = Number(getFifthPageInfo.timeStamp);
    }
    // 第七页 - 设置相爱时间
    let getSeventhPageInfo = result[2].data.data;
    if (getSeventhPageInfo) {
        defaultLoveEachTime = Number(getSeventhPageInfo.timeStamp);
    }
    // 其他设置
    let getDetailsInfo = result[3].data.data;
    if (getDetailsInfo) {
        // 修改网站标题头
        let head = document.head;
        head.children[0].innerText = getDetailsInfo.headTitle;
    }
}
/* 
    修改第二页内容
*/
async function updateDomContent2() {
    let userInfo = checkStorageInfo();
    if (!userInfo) {
        return;
    }
    // 发起post请求
    let result = await instance({
        method: 'post',
        url: '/getInfo/2',
        data: {
            userId: userInfo._id
        }
    });
    // 获取信息
    let getInfo = result.data.data;
    if (getInfo) {
        // 添加 video 
        let videoFather = document.getElementById('video-2');
        let sourceNode = document.createElement('source');
        sourceNode.src = getInfo.fileUrl;
        sourceNode.type = "video/mp4";
        videoFather.appendChild(sourceNode);
        let upText = document.getElementById('baby-video-words-cont');
        upText.innerText = getInfo.upText;
    }
}
/* 
    修改第三页内容
*/
async function updateDomContent3() {
    let userInfo = checkStorageInfo();
    if (!userInfo) {
        return;
    }
    // 发起post请求
    let result = await instance({
        method: 'post',
        url: '/getInfo/3',
        data: {
            userId: userInfo._id
        }
    });
    // 获取信息
    let getInfo = result.data.data;
    if (getInfo) {
        // 添加 video 
        let videoFather = document.getElementById('video-3');
        let sourceNode = document.createElement('source');
        sourceNode.src = getInfo.fileUrl;
        sourceNode.type = "video/mp4";
        videoFather.appendChild(sourceNode);
        let upText = document.getElementById('zz-video-words-cont');
        upText.innerText = getInfo.upText;
    }
}
/* 
    修改第四页内容
*/
async function updateDomContent4() {
    let userInfo = checkStorageInfo();
    if (!userInfo) {
        return;
    }
    // 发起post请求
    let result = await instance({
        method: 'post',
        url: '/getInfo/4',
        data: {
            userId: userInfo._id
        }
    });
    // 获取信息
    let getInfo = result.data.data;
    if (getInfo) {
        // 获取数据集合
        let RotationMap = getInfo.RotationMap;
        if (RotationMap) {
            // let owlPart = document.querySelector('.owl-stage');
            for (let i = 0; i < RotationMap.length; i++) {
                // 获取数据
                let data = RotationMap[i];

                let item = document.querySelector(`#rotation${i + 1}`)
                // 设置左侧
                let left = item.children[0];
                let l_desc1 = left.children[1].children[0];
                let l_desc2 = left.children[1].children[1];
                let l_tit = left.children[2];
                l_desc1.innerText = data.leftTopDesc
                l_desc2.innerText = data.leftBottomDesc
                l_tit.innerText = data.leftTitle

                // 设置右侧
                let right = item.children[1];
                let r_pic = right.children[0].children[0];
                let r_tit = right.children[0].children[1].children[0];
                let r_desc = right.children[0].children[1].children[1];
                r_pic.src = data.fileObj.url
                r_tit.innerText = data.rightTitle
                r_desc.innerText = data.rightDesc
            }
        }
    }
}
/* 
    修改第六页内容
*/
async function updateDomContent6() {
    let userInfo = checkStorageInfo();
    if (!userInfo) {
        return;
    }
    // 发起post请求
    let result = await instance({
        method: 'post',
        url: '/getInfo/6',
        data: {
            userId: userInfo._id
        }
    });
    // 获取信息
    let getInfo = result.data.data;
    if (getInfo) {
        let title = document.querySelector("#title-6");
        let desc11 = document.querySelector("#desc-1-1");
        let desc12 = document.querySelector("#desc-1-2");
        let desc2 = document.querySelector("#desc-2");
        let desc3 = document.querySelector("#desc-3");
        let desc4 = document.querySelector("#desc-4");
        let desc5 = document.querySelector("#desc-5");
        let desc6 = document.querySelector("#desc-6");
        let desc7 = document.querySelector("#desc-7");
        title.innerText = getInfo.title;
        desc11.innerText = getInfo.desc11;
        desc12.innerText = getInfo.desc12;
        desc2.innerText = getInfo.desc2;
        desc3.innerText = getInfo.desc3;
        desc4.innerText = getInfo.desc4;
        desc5.innerText = getInfo.desc5;
        desc6.innerText = getInfo.desc6;
        desc7.innerText = getInfo.desc7;
    }
}

/* 
    修改第八页内容
*/
async function updateDomContent8() {
    let userInfo = checkStorageInfo();
    if (!userInfo) {
        return;
    }
    // 发起post请求
    let result = await instance({
        method: 'post',
        url: '/getInfo/8',
        data: {
            userId: userInfo._id
        }
    });
    // 获取信息
    let getInfo = result.data.data;
    if (getInfo) {
        // 获取数组前五个元素
        let fileArr = getInfo.fileArr.filter((item, index) => {
            return index < 6;
        })
        let photoList = document.querySelector(".photo-list");
        for (let i = 0; i < fileArr.length; i++) {
            // 重置每个元素的子元素的src
            photoList.children[i].children[0].setAttribute('src', fileArr[i].url);
        }
    }
}

// 轮播图
function createItemDom(index, leftTopDesc, leftBottomDesc, leftTitle, picUrl, rightTitle, rightDesc) {
    let item = document.createElement('div');
    item.classList.add('item');
    item.classList.add(`item-${index}`);

    // 左边部分
    let leftPart = document.createElement('div');
    leftPart.classList.add('left-part');

    let topLine = document.createElement('div');
    topLine.classList.add('top-line');

    let leftDesc = document.createElement('div');
    leftDesc.classList.add('desc');
    let leftDescSon1 = document.createElement('div');
    leftDescSon1.innerText = leftTopDesc;
    let leftDescSon2 = document.createElement('div');
    leftDescSon2.innerText = leftBottomDesc;
    leftDesc.appendChild(leftDescSon1);
    leftDesc.appendChild(leftDescSon2);

    let leftTitleDiv = document.createElement('div');
    leftTitleDiv.classList.add('title');
    leftTitleDiv.innerText = leftTitle;

    leftPart.appendChild(topLine);
    leftPart.appendChild(leftDesc);
    leftPart.appendChild(leftTitleDiv);

    // 右边部分
    let rightPart = document.createElement('div');
    rightPart.classList.add('right-part');

    let showPic = document.createElement('div');
    showPic.classList.add('show-pic');

    let rightImg = document.createElement('img');
    rightImg.src = picUrl;
    rightImg.classList.add('pic');

    let rightCont = document.createElement('div');
    rightCont.classList.add('cont');
    let rightTitleDiv = document.createElement('div');
    rightTitleDiv.classList.add('desc-tit');
    rightTitleDiv.innerText = rightTitle;
    let rightDescDiv = document.createElement('div');
    rightDescDiv.classList.add('desc-cont');
    rightDescDiv.innerText = rightDesc;

    rightCont.appendChild(rightTitleDiv);
    rightCont.appendChild(rightDescDiv);

    showPic.appendChild(rightImg);
    showPic.appendChild(rightCont);

    rightPart.appendChild(showPic);

    // 将左右两部分添加到item中
    item.appendChild(leftPart);
    item.appendChild(rightPart);

    return item;
}


window.onload = async function () {
    // 设置第一页数据
    await updateDomContent1();

    // fullpage 
    var myFullpage = new fullpage('#fullpage', {
        verticalCentered: true,
        // 导航小圆点
        navigation: true,
        afterLoad: async function (origin, destination, direction) {
            // 到第一个video的部分的时候
            if (destination.index == 1) {
                updateDomContent2();
                // 添加上方文字动画效果
                let gaga_video = document.querySelector('#baby-video-words');
                gaga_video.classList.remove('hide-res');
                gaga_video.classList.add('show-res');
                gaga_video.classList.add(video_in_animation);
            }
            // 到第二个video的部分的时候
            if (destination.index == 2) {
                updateDomContent3();
                let zz_video = document.querySelector('#zz-video-words');
                zz_video.classList.remove('hide-res');
                zz_video.classList.add('show-res');
                zz_video.classList.add(video_in_animation);
            }
            // 到轮播图的部分的时候
            if (destination.index == 3) {
                updateDomContent4();
            }
            // 到相识计时器的部分的时候
            if (destination.index == 4) {
                // 第二个参数为默认设置, 不用在意
                let timer_animation = document.querySelector('.timer-main');
                timer_animation.classList.remove('hide-res');
                timer_animation.classList.add('show-res');
                timer_animation.classList.add(timer_in_animation);
            }
            // 到总结的部分的时候
            if (destination.index == 5) {
                updateDomContent6();
                let res_content = document.querySelector('#res-content');
                res_content.classList.remove('hide-res');
                res_content.classList.add('show-res');
                res_content.classList.add(res_words_animation)
            }
            // 到相爱计时器的部分的时候
            if (destination.index == 6) {
                // 第一个参数为默认设置, 不用在意
                let timer_animation = document.querySelector('.timer-main-love');
                timer_animation.classList.remove('hide-res');
                timer_animation.classList.add('show-res');
                timer_animation.classList.add(timer_in_animation);
            }
            // 监听箭头是否到最后一个部分（相册）
            if (destination.index == 7) {
                updateDomContent8();

                // 去除最后一个部分的向下小箭头 
                let arrow_down = document.querySelector('.arrow-down');
                arrow_down.style.opacity = '0';

                // 给中心文字添加动画
                let centerWords = document.querySelector('.photos-content');
                centerWords.classList.remove('hide-opacity');
                centerWords.classList.add('move-in');

                // 添加背景点进入页面的动画
                let bg_pic_animation = document.querySelectorAll('.bg-pic');
                for (let item of [...bg_pic_animation]) {
                    item.classList.remove('hide-res');
                    item.classList.add('show-res');
                    item.classList.add('bg-move-in-pgae');
                }

                // 添加照片进入页面的动画
                let pic_box_animation = document.querySelectorAll('.pic-box');
                for (let item of [...pic_box_animation]) {
                    item.classList.remove('hide-res');
                    item.classList.add('show-res');
                    item.classList.add('slide-in-bck-bl-photos-list');
                }
            }
        },
        onLeave: function (origin, destination, direction) {
            // 离开相识计时器的部分的时候
            if (origin.index == 4) {
                let timer_run = setTimeout(() => {
                    let timer_animation = document.querySelector('.timer-main');
                    timer_animation.classList.remove('show-res');
                    timer_animation.classList.remove(timer_in_animation);
                    timer_animation.classList.add('hide-res');
                    clearTimeout(timer_run);
                }, 700)
            }

            // 离开相爱计时器的部分的时候
            if (origin.index == 6) {
                let timer_run_love = setTimeout(() => {
                    let timer_animation = document.querySelector('.timer-main-love');
                    timer_animation.classList.remove('show-res');
                    timer_animation.classList.remove(timer_in_animation);
                    timer_animation.classList.add('hide-res');
                    clearTimeout(timer_run_love);
                }, 700)
            }

            // 离开第一个video的部分的时候
            if (origin.index == 1) {
                let gaga_video_timer = setTimeout(() => {
                    let gaga_video = document.querySelector('#baby-video-words');
                    gaga_video.classList.remove('show-res');
                    gaga_video.classList.remove(video_in_animation);
                    gaga_video.classList.add('hide-res');
                    clearTimeout(gaga_video_timer);
                }, 700)
            }

            // 离开第二个video的部分的时候
            if (origin.index == 2) {
                let zz_video_timer = setTimeout(() => {
                    let zz_video = document.querySelector('#zz-video-words');
                    zz_video.classList.remove('show-res');
                    zz_video.classList.remove(video_in_animation);
                    zz_video.classList.add('hide-res');
                    clearTimeout(zz_video_timer);
                }, 700)
            }

            // 离开总结的部分的时候
            if (origin.index == 5) {
                let timer = setTimeout(() => {
                    // 去除动画
                    let res_content = document.querySelector('#res-content');
                    res_content.classList.remove('show-res');
                    res_content.classList.remove(res_words_animation);
                    res_content.classList.add('hide-res');
                    clearTimeout(timer);
                }, 700)
            }

            // 离开相册的部分的时候（相册）
            if (origin.index == 7) {
                // 恢复最后一个部分的向下小箭头 
                let arrow_down = document.querySelector('.arrow-down');
                arrow_down.style.opacity = '1';

                let pic_box_animation_timer = setTimeout(() => {
                    // 删除中心文字动画
                    let centerWords = document.querySelector('.photos-content');
                    centerWords.classList.remove('move-in');
                    centerWords.classList.add('hide-opacity');

                    // 删除背景点进入页面的动画
                    let bg_pic_animation_cancel = document.querySelectorAll('.bg-pic');
                    for (let item of [...bg_pic_animation_cancel]) {
                        item.classList.remove('show-res');
                        item.classList.remove('bg-move-in-pgae');
                        item.classList.add('hide-res');
                    }

                    // 删除照片进入页面的动画
                    let pic_box_animation_cancel = document.querySelectorAll('.pic-box');
                    for (let item of [...pic_box_animation_cancel]) {
                        item.classList.remove('show-res');
                        item.classList.remove('slide-in-bck-bl-photos-list');
                        item.classList.add('hide-res');
                    }
                    clearTimeout(pic_box_animation_timer);
                }, 700)
            }
        }
    });

    // 计时器
    /* 
        @knowEachTime 相识时间
        @knowEachTime 相爱时间
    */
    function timerRunningMarchine(knowEachTime, loveEachTime) {
        // 每次调用该函数先清理掉之前的计时器
        clearInterval(runTimer);
        // 相识时间
        let startDate = knowEachTime;
        let startTimeStamp = new Date(startDate).getTime();
        // 相爱时间
        let startDate_love = loveEachTime;
        let startTimeStamp_love = new Date(startDate_love).getTime();

        runTimer = setInterval(() => {
            // 获取当前时间
            let nowTime = new Date().getTime();
            // 相识时间戳(s)
            let disTime = nowTime - startTimeStamp;

            // 相爱时间戳(s)
            let disTime_love = nowTime - startTimeStamp_love;

            // 显示的相识时间
            let timer_know = runningTime(disTime);
            // 相识时间
            let timer = document.getElementById('timer');
            timer.innerText = timer_know.days + "天" + timer_know.hours + "小时" + timer_know.minutes + "分钟" + timer_know.seconds + "秒";

            // 显示的相爱时间
            let timer_love_time = runningTime(disTime_love);
            // 相爱时间
            let timer_love = document.getElementById('timer-love');
            timer_love.innerText = timer_love_time.days + "天" + timer_love_time.hours + "小时" + timer_love_time.minutes + "分钟" + timer_love_time.seconds + "秒";

        }, 1000)

        function runningTime(disTime) {
            //天数
            var days = Math.floor(disTime / (24 * 60 * 60 * 1000))
            //小时数
            var day_ms = disTime % (24 * 60 * 60 * 1000) //计算天数后剩余的毫秒数
            var hours = Math.floor(day_ms / (60 * 60 * 1000))
            //分钟数
            var day_hour = day_ms % (60 * 60 * 1000) //计算小时数后剩余的毫秒数
            var minutes = Math.floor(day_hour / (60 * 1000))
            //秒数
            var day_min = day_hour % (60 * 1000) //计算分钟数后剩余的毫秒数
            var seconds = Math.round(day_min / 1000)

            return {
                days,
                hours,
                minutes,
                seconds
            }
        }
    }
    // 启动计时器
    timerRunningMarchine(defaultKnowEachTime, defaultLoveEachTime);

    // 进入相册
    let goAlbum = document.querySelector('#go-album');
    goAlbum.onclick = function () {
        location.href = 'album.html';
    }
}


// 秘密表白内容
// console.log('送你一个小心心：');
// console.log('    ❤️ ❤️             ❤️ ❤️ ');
// console.log('  ❤️ ❤️ ❤️ ❤️       ❤️ ❤️ ❤️ ❤️');
// console.log('❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️');
// console.log('❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️');
// console.log('❤️ ❤️ ❤️ l o v e y o u ❤️ ❤️ ❤️ ❤️ ');
// console.log('  ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️');
// console.log('   ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️');
// console.log('     ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️');
// console.log('       ❤️ ❤️ ❤️ ❤️ ❤️ ❤️');
// console.log('         ❤️ ❤️ ❤️ ❤️');
// console.log('           ❤️ ❤️');
// console.log('            ❤️');