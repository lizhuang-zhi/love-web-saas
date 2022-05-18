<template>
  <div class="i-container">
    <n-form
      :model="formState"
      :rules="rules"
      class="i-form"
      label-placement="left"
    >
      <h1>注册</h1>
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
      <!-- 性别 -->
      <n-form-item path="gender">
        <div class="gender-label">性别</div>
        <n-radio-group
          v-model:value="formState.gender"
          name="radiobuttongroup1"
        >
          <n-radio-button
            v-for="item in genders"
            :key="item.value"
            :value="item.value"
            :label="item.label"
            @change="updateChecked"
          />
        </n-radio-group>
      </n-form-item>
      <!-- 邮箱 -->
      <n-form-item path="email">
        <n-input
          v-model:value="formState.email"
          :placeholder="t('common.email')"
          :input-props="{ autocomplete: 'off' }"
        ></n-input>
      </n-form-item>
      <!-- 验证码 -->
      <n-form-item path="code">
        <n-button
          type="primary"
          :loading="loadingCode"
          style="width: 120px; margin-right: 20px"
          :disabled="invalidCode()"
          @click="getCode"
        >
          获取
        </n-button>
        <n-input
          v-model:value="formState.code"
          :placeholder="t('common.code')"
          :input-props="{ autocomplete: 'off' }"
        ></n-input>
      </n-form-item>

      <n-form-item class="register-btn">
        <!-- 返回按钮 -->
        <n-button quaternary style="margin: 0 15px 0 0" @click="handleBack">
          {{ t("common.back") }}
        </n-button>
        <!-- 注册按钮 -->
        <n-button
          type="primary"
          attr-type="submit"
          :loading="loadingRegister"
          @click="handleSubmit"
          :disabled="invalidForm()"
          style="width: 120px"
        >
          {{ t("common.sign_up") }}
        </n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script>
import { ref, reactive, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NRadioGroup,
  NRadioButton,
  useNotification,
} from "naive-ui";
import { useI18n } from "vue-i18n";
import { UserRegister, EmailCodeSend, VerifyEmailExist } from "@/api/user";

export default defineComponent({
  components: {
    NForm,
    NFormItem,
    NInput,
    NButton,
    NRadioGroup,
    NRadioButton,
  },
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
      gender: "",
      email: "",
      code: "",
    });
    const notification = useNotification();
    let loadingCode = ref(false);
    let loadingRegister = ref(false);

    // 定义消息通知
    const notify = (type, message) => {
      notification[type]({
        content: message,
        duration: 2000,
      });
    };

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
      gender: {
        required: true,
        trigger: "blur",
        message: "",
      },
      email: {
        required: true,
        trigger: "blur",
        message: "",
      },
      code: {
        required: true,
        trigger: "blur",
        message: "",
      },
    };
    // 单选框, 修改选中值
    const updateChecked = (checked) => {
      formState.gender = checked.target.value;
    };
    // 验证表单是否填写
    function invalidForm() {
      let { username, password, gender, email, code } = formState;
      return (
        username === "" ||
        password === "" ||
        gender === "" ||
        email === "" ||
        code === ""
      );
    }
    // 验证邮箱是否输入
    function invalidCode() {
      let { email } = formState;
      return email === "";
    }
    // 获取验证码
    const getCode = async () => {
      loadingCode.value = true;
      // 判断验证码还是否有效
      let codeExpire = localStorage.getItem("codeExpire");
      let nowTime = Date.now();
      // 还没过有效期
      if (nowTime < Number(codeExpire)) {
        notify("warning", "验证码已发送, 请勿频繁获取, 请5分钟后再试");
        loadingCode.value = false;
        return;
      }
      // 验证邮箱是否正确
      var reg =
        /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (reg.test(formState.email)) {
        // 判断邮箱是否已经注册
        let result = await VerifyEmailExist({
          email: formState.email,
        });
        if (result.status == 400) {
          // 邮箱已经存在
          notify("error", result.message);
        } else {
          // 发送验证码
          let codeResult = await EmailCodeSend({
            email: formState.email,
          });
          if (codeResult.status == 200) {
            notify("success", codeResult.message);
            // 存储验证码有效期
            let expire = codeResult.data.expire;
            localStorage.setItem("codeExpire", expire);
          } else {
            notify("error", codeResult.message);
          }
        }
      } else {
        // 验证失败
        notify("error", "邮箱格式有误, 请检查后再试");
      }
      loadingCode.value = false;
    };
    // 点击返回
    function handleBack() {
      Router.push("/login");
    }
    // 点击注册
    async function handleSubmit() {
      loadingRegister.value = true;
      // 请求后台进行注册
      let result = await UserRegister({
        username: formState.username,
        password: formState.password,
        email: formState.email,
        gender: formState.gender === "Boy" ? 1 : 0,
        code: formState.code,
        nowTime: Date.now(),
      });
      console.log(result);
      if (result.status == 200) {
        Router.push("/login");
      } else {
        notify("error", result.message);
      }
      loadingRegister.value = false;
    }

    return {
      loadingCode,
      loadingRegister,
      formState,
      rules,
      handleSubmit,
      handleBack,
      invalidForm,
      t,
      invalidCode,
      getCode,
      genders: [
        {
          value: "Boy",
          label: "Boy",
        },
        {
          value: "Gril",
          label: "Gril",
        },
      ],
      updateChecked,
    };
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
.register-btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}
.gender-label {
  width: 90px;
  height: 34px;
  padding-left: 20px;
  line-height: 34px;
  background: #ebeaee;
  color: #b5b5b5;
  margin-right: 20px;
}
.n-radio-button {
  width: 100px;
  text-align: center;
}
</style>
