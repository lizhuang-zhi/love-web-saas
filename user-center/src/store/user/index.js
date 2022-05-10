import { UserLogin } from "@/api/user";
import { setUserToken, deleteUserToken } from "@/utils/auth";
import { USER_LOGIN, USER_LOGOUT, USER_INIT } from "./mutation_types";

function initState() {
    return {
        username: "",
        token: "",
        avatar: "",
        role: "",
    };
}
const state = initState();

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
        if (!state.token) {
            state = Object.assign(state, user);
        }
    },
};

const actions = {
    INITUSERINFO: ({ commit }, user) => {
        // 获取用户信息
        const queryUser = user.userInfo;
        let resultUser = null;
        if(user.token) {
            const token = user.token;
            // 将 token 合并到 queryUser
            resultUser = Object.assign(queryUser, {token});
            commit(USER_INIT, resultUser);
        }else {
            commit(USER_INIT, queryUser);
        }
    },
    LOGIN: async ({ commit }, user) => {
        // 请求登录接口
        const result = await UserLogin(user);
        return result;
    },
    LOGOUT: ({ commit }) => {
        commit(USER_LOGOUT);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
