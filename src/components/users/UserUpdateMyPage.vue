<template>
  <div class="base-container">
    <div class="logo-container">
      <h1 style="font-size: 50px">회원 수정</h1>
    </div>
    <a-form
      :model="formState"
      v-bind="layout"
      name="nest-messages"
      :validate-messages="validateMessages"
      @finish="onFinish"
      style="margin-top: 50px; display: flex; flex-direction: column; align-items: center"
    >
      <a-form-item name="userId" label="아이디">
        <a-input v-model:value="formState.userId" disabled />
      </a-form-item>
      <a-form-item name="userName" label="이름">
        <a-input v-model:value="formState.userName" />
      </a-form-item>
      <a-form-item
        label="Password"
        name="userPassword"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.userPassword" />
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

      <a-form-item :name="joinedTime" label="가입일자" aria-readonly="true">
        <a-input v-model:value="formState.joinedTime" disabled />
      </a-form-item>
      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
        <a-button type="primary" html-type="submit">수정</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const router = useRouter()
const memberStore = useMemberStore()
let { userInfo } = storeToRefs(useMemberStore())
const { userUpdate } = memberStore

const parseDate = (dp) => {
  return dayjs(dp).format('YYYY-MM-DD')
}

import { reactive } from 'vue'
const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
}
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
}

const formState = reactive({
  userId: userInfo.value.userId,
  userName: userInfo.value.userName,
  userPassword: '',
  emailId: userInfo.value.emailId,
  emailDomain: userInfo.value.emailDomain,
  joinedTime: parseDate(userInfo.value.joinedTime)
})

const selectChangeHandler = (e) => {
  console.log('e.value = ' + e)
  formState.emailDomain = e
}

const onFinish = async (values) => {
  formState.value = values
  await userUpdate(formState)
  console.log('Success:', values)
  await router.push({ name: 'login' })
}

// const onFinish = (values) => {
//   console.log('Success:', values)
// }
</script>
<style>
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
</style>
