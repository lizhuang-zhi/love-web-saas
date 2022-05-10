<template>
    <div class="i-container">
        <n-form
            :model="formState"
            :rules="rules"
            class="i-form"
            label-placement="left"
        >
            <!-- 网站title -->
            <h1>{{ APP_NAME }}</h1>
            <!-- 用户名 -->
            <n-form-item path="username">
                <n-input
                    v-model:value="formState.username"
                    :placeholder="t('common.username')"
                    :input-props="{ autocomplete: 'off' }"
                ></n-input>
            </n-form-item>
            <!-- 密码 -->
            <n-form-item path="password">
                <n-input
                    v-model:value="formState.password"
                    type="password"
                    :placeholder="t('common.password')"
                    :input-props="{ autocomplete: 'off' }"
                ></n-input>
            </n-form-item>

            <n-form-item>
                <p class="i-form-msg">没号就注册</p>
                <!-- 注册按钮 -->
                <n-button
                    quaternary
                    style="margin: 0 15px 0 0"
                    @click="handleRegister"
                >
                    {{ t("common.sign_up") }}
                </n-button>
                <!-- 登录按钮 -->
                <n-button
                    type="primary"
                    attr-type="submit"
                    :loading="loading"
                    @click="handleSubmit"
                    :disabled="invalidForm()"
                    style="width: 120px"
                >
                    {{ t("common.sign_in") }}
                </n-button>
            </n-form-item>
        </n-form>
    </div>
</template>

<script>
import { ref, reactive, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { NForm, NFormItem, NInput, NButton } from "naive-ui";
import { useI18n } from "vue-i18n";
import { APP_NAME, ON_PERMISSION } from "@/settings.js";
import Message from "@/components/message";

export default defineComponent({
    setup() {
        // 状态管理
        const Store = useStore();
        // 路由
        const Router = useRouter();
        // 国际化
        const { t } = useI18n();
        const formState = reactive({
            username: "",
            password: "",
        });
        // 验证表单的规则(写在 n-form 标签上)
        const rules = {
            username: {
                required: true,
                trigger: "blur",
                message: "",
            },
            password: {
                required: true,
                trigger: "blur",
                message: "",
            },
        };
        let loading = ref(false);
        // 点击登录
        async function handleSubmit() {
            loading.value = true;
            let result = await Store.dispatch("user/LOGIN", formState);
            console.log(result);
            // 获取token
            const token = result.token;
            if(result.status != 200) {
                Message(`用户名或密码错误`);
            }else {
                await Store.dispatch("user/INITUSERINFO", result);
                localStorage.setItem("token", token);
                Router.push('/dashboard');
            }
            loading.value = false;
        }
        // 验证表单是否填写
        function invalidForm() {
            let { username, password } = formState;
            return username === "" || password === "";
        }
        // 点击注册
        function handleRegister() {
            Router.push('/register');
        }
        return {
            APP_NAME,
            ON_PERMISSION,
            loading,
            formState,
            rules,
            handleSubmit,
            handleRegister,
            invalidForm,
            t,
        };
    },
    components: {
        NForm,
        NFormItem,
        NInput,
        NButton,
    },
});
</script>

<style lang="scss" scoped>
.i-container {
    background: var(--background-secondary);
}
.i-form {
    box-sizing: border-box;
    margin: auto;
    padding: 12px 24px;
    width: 360px;
    max-width: 100%;
    border-radius: var(--radius);
    background: var(--background);
    h1 {
        margin-bottom: 24px;
    }
}
.i-form-msg {
    margin-right: auto;
}
</style>
