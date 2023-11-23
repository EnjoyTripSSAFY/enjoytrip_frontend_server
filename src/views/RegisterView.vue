<template>
  <div class="base-container">
    <div class="logo-container">
      <h1 style="font-size: 60px">Register</h1>
    </div>
    <div class="logo-container">
      <img src="@/assets/logo.svg" alt="Logo" width="160" height="160" />
    </div>
    <div class="login-container">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 24 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="UserId"
          name="userId"
          :rules="[{ required: true, message: 'Please input your userId!' }]"
        >
          <a-input v-model:value="formState.userId" />
        </a-form-item>
        <a-form-item
          label="Username"
          name="userName"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.userName" />
        </a-form-item>

        <a-form-item
          label="Email"
          name="emailId"
          :rules="[{ required: true, message: 'Please input your email!' }]"
        >
          <a-input v-model:value="formState.emailId">
            <template #addonAfter>
              <a-select
                @change="selectChangeHandler"
                v-model:value="formState.emailDomain"
                style="width: 120px"
              >
                <a-select-option value="@naver.com">@naver.com</a-select-option>
                <a-select-option value="@google.com">@google.com</a-select-option>
              </a-select>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="userPassword"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.userPassword" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMemberStore } from '@/stores/member'

const router = useRouter()
const memberStore = useMemberStore()
const { userJoin } = memberStore

const formState = reactive({
  userId: '',
  userName: '',
  userPassword: '',
  emailId: '',
  emailDomain: ''
})

const selectChangeHandler = (e) => {
  console.log('e.value = ' + e)
  formState.emailDomain = e
}

const onFinish = async (values) => {
  formState.value = values
  await userJoin(formState)
  console.log('Success:', values)
  await router.push({ name: 'login' })
}

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(formState.username && formState.password)
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
  //height: 70vh; /* 화면 전체 높이에 따라 중앙에 배치 */
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
