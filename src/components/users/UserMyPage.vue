<script setup>
import { ref } from 'vue'
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'

const withdrawalMessage = () => {
  message.info('정상적으로 탈퇴되었습니다.')
  router.push({ name: 'home' })
}

message.config({
  top: '100px',
  duration: 1,
  maxCount: 1,
  rtl: true,
  prefixCls: 'my-message'
})

const router = useRouter()
const memberStore = useMemberStore()
const { userWithdrawal } = memberStore
let { userInfo } = storeToRefs(useMemberStore())

// const withdrawal = (userId) => {
//   userWithdrawal(userId)
//   router.push({ name: 'home' })
// }

const user = ref(userInfo)
const isWithDrawalTry = ref(false)

const withdrawalTry = () => {
  isWithDrawalTry.value = true
}

const withdrawal = async () => {
  console.log('withdrawal!!!')
  console.log('values = ' + userInfo.value.userId)
  await userWithdrawal(userInfo.value.userId)
  withdrawalMessage()
  await router.push({ name: 'home' })
}

const declined = () => {
  message.info('취소되었습니다.')
  isWithDrawalTry.value = false
}

const moveUpdate = () => {
  router.push({ name: 'user-update-mypage' })
}

const parseDate = (dp) => {
  return dayjs(dp).format('YYYY-MM-DD')
}
</script>

<template>
  <div v-if="isWithDrawalTry === true">
    <a-space direction="vertical" style="width: 100%">
      <a-alert
        message="Warning"
        description="탈퇴 시 모든 정보는 복구가 불가합니다. 정말 탈퇴하시겠습니까?"
        type="error"
        closable
      >
        <template #action>
          <a-space direction="vertical">
            <a-button size="small" type="primary" @click="withdrawal()">Accept</a-button>
            <a-button size="small" danger type="ghost" @click="declined()">Decline</a-button>
          </a-space>
        </template>
      </a-alert>
    </a-space>
  </div>

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
        <a-button type="primary" danger ghost @click="withdrawalTry()">탈퇴</a-button>
      </a-radio-group>
    </a-space>
  </div>
</template>
