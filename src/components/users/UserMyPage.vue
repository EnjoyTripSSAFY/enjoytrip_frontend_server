<script setup>
import { ref } from 'vue'
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const router = useRouter()
const memberStore = useMemberStore()
const { userWithdrawal } = memberStore
let { userInfo } = storeToRefs(useMemberStore())

// const withdrawal = (userId) => {
//   userWithdrawal(userId)
//   router.push({ name: 'home' })
// }

const user = ref(userInfo)

const withdrawal = async () => {
  console.log('withdrawal!!!')
  console.log('values = ' + userInfo.value.userId)
  await userWithdrawal(userInfo.value.userId)
  await router.push({ name: 'home' })
}

const moveUpdate = () => {
  router.push({ name: 'user-update-mypage' })
}

const parseDate = (dp) => {
  return dayjs(dp).format('YYYY-MM-DD')
}
</script>

<template>
  <div style="display: flex; margin-top: 100px">
    <a-space direction="vertical" :size="32" style="margin: 50px">
      <a-space wrap :size="16">
        <a-avatar :size="120">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </a-space>
    </a-space>
    <a-descriptions title="User Info" style="margin-top: 50px">
      <a-descriptions-item label="아이디">{{ user.userId }}</a-descriptions-item>
      <a-descriptions-item label="이름">{{ user.userName }}</a-descriptions-item>
      <a-descriptions-item label="이메일">{{
        user.emailId + user.emailDomain
      }}</a-descriptions-item>
      <a-descriptions-item label="가입일">{{ parseDate(user.joinedTime) }}</a-descriptions-item>
      <a-descriptions-item label="계정 유형">
        {{ user.roles }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
  <div>
    <a-space direction="vertical" style="display: flex; align-items: center; margin-top: 30px">
      <a-radio-group v-model:value="size">
        <a-button type="primary" ghost style="margin-right: 10px" @click="moveUpdate"
          >수정</a-button
        >
        <a-button type="primary" danger ghost @click="withdrawal()">탈퇴</a-button>
      </a-radio-group>
    </a-space>
  </div>
</template>
