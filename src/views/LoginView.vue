<template>
  <div class="base-container">
    <div class="logo-container">
      <h1 style="font-size: 60px">Login</h1>
    </div>

    <div class="logo-container">
      <img src="@/assets/logo.svg" alt="Logo" width="160" height="160" />
    </div>
    <div class="login-container">
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Username"
          name="userId"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.userId">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="userPassword"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.userPassword">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <!-- <div v-if="isLoginError === true">
          <a-space direction="vertical" style="width: 100%">
            <a-alert type="error" message="로그인 실패" banner />
          </a-space>
        </div> -->
        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">Forgot password</a>
        </a-form-item>

        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            Log in
          </a-button>
          Or
          <a @click="moveRegist">register now!</a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useMemberStore } from '@/stores/member'
import { useMenuStore } from '@/stores/menu'
import { ref, reactive, computed } from 'vue'
import { message } from 'ant-design-vue'

const loginSuccessMessage = () => {
  message.info('로그인!')
}

const loginFailMessage = () => {
  message.error('로그인 실패!')
}

message.config({
  top: '100px',
  duration: 2,
  maxCount: 2,
  rtl: true,
  prefixCls: 'my-message'
})

const router = useRouter()
const memberStore = useMemberStore()

const { userLogin, getUserInfo } = memberStore
const { isLogin, isLoginError } = storeToRefs(memberStore)
const { changeMenuState } = useMenuStore()

const formState = reactive({
  userId: '',
  userPassword: '',
  remember: true
})

const onFinish = async (values) => {
  console.log('values = ' + values)
  await userLogin(values)
  let token = sessionStorage.getItem('access-token')
  console.log('isLogin : ' + isLogin.value)
  console.log('isLoginFail : ' + isLoginError.value)
  if (isLogin.value === true) {
    getUserInfo(token)
    loginSuccessMessage()
  } else {
    loginFailMessage()
  }
}

const moveRegist = () => {
  router.push({ name: 'register' })
}

const onFinishFailed = (errorInfo) => {
  loginFailMessage()
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(formState.userId && formState.userPassword)
})
</script>

<style scoped>
.base-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  height: 70vh; /* 화면 전체 높이에 따라 중앙에 배치 */
}
.logo-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.login-container {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  /* height: 70vh; 화면 전체 높이에 따라 중앙에 배치 */
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
/* 필요한 스타일을 추가하세요. */
</style>
