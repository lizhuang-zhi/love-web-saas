import '../css/login.css';
import axios from 'axios';


window.onload = function () {
    // 输入不完整提示
    const inputError = "用户名或账户未输入, 请检查";

    // 用户名和密码
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');

    // axios 实例
    const instance = axios.create({
        baseURL: 'http://162.14.99.93:5001',
        // baseURL: 'http://127.0.0.1:5001',
        timeout: 4000
    });

    // 检查是否输入账号与密码
    function checkInput() {
        if (email.value == "" || password.value == "") {
            return false;
        }
        return true;
    }

    // 点击登录
    let loginBtn = document.querySelector("#loginBtn")
    loginBtn.onclick = async function () {
        if (!checkInput()) {
            alert(inputError);
            return;
        }
        // 发起登录请求
        let result = await instance({
            method: 'post',
            url: '/login',
            data: {
                email: email.value,
                password: password.value
            }
        });
        let data = result.data;
        console.log(data);
        // 获取用户信息
        let userInfo = JSON.stringify(data.data);
        if (data.status == 200) {
            localStorage.setItem("userInfo", userInfo)
            // 跳转首页
            location.href = "./index.html";
        } else {
            alert(data.message);
        }
    }

}