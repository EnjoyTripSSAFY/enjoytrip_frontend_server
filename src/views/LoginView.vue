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
        :model="loginUser"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="UserId"
          name="userId"
          :rules="[{ required: true, message: 'Please input your Id!' }]"
        >
          <a-input v-model:value="loginUser.userId">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="userPwd"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="loginUser.userPwd">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="loginUser.remember">Remember me</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">Forgot password</a>
        </a-form-item>

        <a-form-item>
          <a-button :disabled="disabled" type="primary" class="login-form-button" @click="login">
            Log in
          </a-button>
          Or
          <a href="">register now!</a>
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

const router = useRouter()
const memberStore = useMemberStore()

const { isLogin } = storeToRefs(memberStore)
const { userLogin, getUserInfo } = memberStore
const { changeMenuState } = useMenuStore()

// const loginUser = reactive({
//   username: '',
//   password: '',
//   remember: true
// })

const userId = ref('')
const userPwd = ref('')
const remember = ref(true)

const loginUser = reactive({
  userId: userId.value,
  userPwd: userPwd.value,
  remember: remember.value
})

const login = async () => {
  console.log('data : ' + loginUser.value)
  await userLogin(loginUser.value)
  let token = sessionStorage.getItem('access-token')
  if (isLogin) {
    getUserInfo(token)
    changeMenuState()
  }
  router.push('/')
}

// const formState = reactive({
//   username: '',
//   password: '',
//   remember: true
// })

const onFinish = (values) => {
  console.log('Success:', values)
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(loginUser.userId && loginUser.userPwd)
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
</style>
