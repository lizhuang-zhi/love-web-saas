import '../css/album.css'
import '../css/album_small.css'
import axios from 'axios';


const AxiosRequestUrl = 'http://116.205.247.150';
// const AxiosRequestUrl = 'http://127.0.0.1:5001';

// axios 实例
const instance = axios.create({
    baseURL: AxiosRequestUrl,
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
    请求相册数据
*/
async function updateAlbum() {
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
    console.log(result);
    // 获取信息
    let getInfo = result.data.data;
    if (getInfo) {
        // 重写相册显示
        let fileArr = getInfo.fileArr;
        // 删除原来的所有图片
        let mainBox = document.querySelector(".main-box");
        mainBox.innerHTML = "";
        // 重新从数据库添加照片
        for (let i = 0; i < fileArr.length; i++) {
            let url = fileArr[i].url;
            let newNode = createDomNode(url);
            mainBox.appendChild(newNode);
        }
    }
}
/* 
    请求其他设置数据
*/
async function updateOtherSetting() {
    let userInfo = checkStorageInfo();
    if (!userInfo) {
        return;
    }
    // 发起post请求
    let result = await instance({
        method: 'post',
        url: '/getInfo/details',
        data: {
            userId: userInfo._id
        }
    });
    console.log(result);
    // 获取信息
    let getInfo = result.data.data;
    if (getInfo) {
        // 修改网站标题头
        let head = document.head;
        head.children[0].innerText = getInfo.headTitle;
    }
}

// 新建DOM节点
function createDomNode(picUrl, picName = "我们的回忆", picDesc = "共同的时光系列") {
    let itemPic = document.createElement('div');
    itemPic.classList.add('item-pic');
    let upImg = document.createElement('div');
    upImg.classList.add('up-img');
    let img = document.createElement('img');
    img.src = picUrl;
    img.classList.add('pic-img');
    upImg.appendChild(img);
    let downWords = document.createElement('div');
    downWords.classList.add('down-words');
    let tit = document.createElement('div');
    tit.classList.add('tit');
    tit.innerText = picName;
    let cont = document.createElement('div');
    cont.classList.add('cont');
    cont.innerText = picDesc;
    downWords.appendChild(tit);
    downWords.appendChild(cont);
    itemPic.appendChild(upImg);
    itemPic.appendChild(downWords);
    return itemPic;
}

window.onload = async function () {
    // 返回按钮
    let backBtn = document.querySelector('#back-to-index');
    backBtn.onclick = function () {
        window.history.back();
    }
    // 加载动画
    let load = document.querySelector('.loading');
    let container_main = document.querySelector('.container-main');

    // 同步请求相册数据
    let res1 = await updateAlbum();
    console.log(res1);
    // 同步其他设置
    let res2 = await updateOtherSetting();
    console.log(res2);


    // loading加载完毕
    load.classList.remove('loading');
    load.classList.add('not-show');
    // 显示主体内容
    container_main.classList.remove('not-show');
}