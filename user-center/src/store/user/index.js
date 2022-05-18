import {
    UserLogin
} from "@/api/user";
import {
    setUserToken,
    deleteUserToken
} from "@/utils/auth";
import {
    USER_LOGIN,
    USER_LOGOUT,
    USER_INIT
} from "./mutation_types";

const mutations = {
    // 登录
    [USER_LOGIN]: (state, user) => {
        setUserToken(user);
    },
    // 注销
    [USER_LOGOUT]: (state) => {
        state = Object.assign(state, initState());
        deleteUserToken();
    },
    // 用户信息初始化
    [USER_INIT]: (state, user) => {
        // state = Object.assign(state, user);
        state.username = user.username;
        state.email = user.email;
        state.userid = user._id;
        state.token = localStorage.getItem("token");
    },
};

const actions = {
    /* 
        @user: 接收一个用户信息的对象
    */
    INITUSERINFO: ({
        commit
    }, user) => {
        // 获取用户信息
        commit(USER_INIT, user);
    },
    LOGIN: async ({
        commit
    }, user) => {
        // 请求登录接口
        const result = await UserLogin(user);
        return result;  
    },
    LOGOUT: ({
        commit
    }) => {
        commit(USER_LOGOUT);
    },
};

export default {
    namespaced: true,
    state() {
        return {
            username: "",
            email: "",
            userid: "",
            token: "",
            
            avatar: "",
            role: "",
        }
    },
    mutations,
    actions,
};