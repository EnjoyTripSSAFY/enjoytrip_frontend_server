<template>
  <a-layout-header :style="{ background: '#fff', padding: '0 50px' }">
    <a-row :gutter="16" type="flex" justify="space-between" align="middle">
      <a-col :span="4">
        <img class="logo" src="@/assets/img/gallery/logo.png" alt="Logo" @click="moveHome" />
      </a-col>

      <a-col :span="9">
        <a-menu
          mode="horizontal"
          :theme="menuTheme"
          :selected-keys="[currentMenu]"
          @select="handleMenuSelect"
        >
          <a-menu-item key="attraction" @click="moveAttraction">지역별 관광지</a-menu-item>
          <a-menu-item key="plan" @click="moveTripPlan">나의 여행계획</a-menu-item>
          <a-menu-item key="myplan" @click="moveMyPlan">여행계획 조회</a-menu-item>
          <a-menu-item key="contact" @click="moveHotPlace">핫플 자랑하기</a-menu-item>
          <a-menu-item key="sharing" @click="moveTripInfoSharing">여행정보공유</a-menu-item>
        </a-menu>
      </a-col>

      <a-col :span="2" style="text-align: right">
        <a-menu mode="horizontal" :theme="menuTheme" :selected-keys="[currentMenu]">
          <a-sub-menu v-if="!isLogin" key="loginMenu" title="Login/Signup">
            <a-menu-item key="signup" @click="moveLogin">Login</a-menu-item>
            <a-menu-item key="login" @click="moveRegister">Signup</a-menu-item>
          </a-sub-menu>

          <a-sub-menu
            v-else-if="isLogin && userInfo.roles === 'MEMBER'"
            key="userMenu"
            :title="`${userInfo.userId}(${userInfo.roles})`"
          >
            <a-menu-item key="myPage" @click="moveMyPage">My Page</a-menu-item>
            <a-menu-item key="logout" @click="logout(userInfo.userId)">Logout</a-menu-item>
          </a-sub-menu>

          <a-sub-menu
            v-if="isLogin && userInfo.roles === 'ADMIN'"
            key="adminMenu"
            :title="`${userInfo.userId}(${userInfo.roles})`"
          >
            <a-menu-item key="myPage" @click="moveMyPage">My Page</a-menu-item>
            <a-menu-item key="admin">Admin</a-menu-item>
            <a-menu-item key="logout" @click="logout(userInfo.userId)">Logout</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<style scoped>
.logo {
  height: 32px;
}
</style>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import { message } from 'ant-design-vue'

const logoutMessage = () => {
  message.warning('로그아웃!')
  router.push({ name: 'home' })
}

message.config({
  top: '100px',
  duration: 2,
  maxCount: 3,
  rtl: true,
  prefixCls: 'my-message'
})

let { isLogin, userInfo } = storeToRefs(useMemberStore())
const menuTheme = ref('light') // or 'light'
const currentMenu = ref('home')

const router = useRouter()

//////////////////////////
const memberStore = useMemberStore()
let { userLogout } = memberStore

const logout = (userId) => {
  logoutMessage()
  console.log('로그아웃!!!!')
  console.log(userId)
  userLogout(userId)
}

function moveMyPage() {
  // if (!isLogin.value) {
  //   router.push({ name: '403page' })
  // }
  router.push({ name: 'user-mypage' })
}

function moveHome() {
  console.log(userInfo)
  router.push({ name: 'home' })
}
function moveTripInfoSharing() {
  router.push({ name: 'tripInfoSharing' })
}

function moveAttraction() {
  router.push({ name: 'attraction' })
}

function moveHotPlace() {
  // router.push({ name: 'hotPlace' })
  router.push({ name: 'updatePage' })
}

function moveTripPlan() {
  // if (!isLogin.value) {
  //   router.push({ name: '403page' })
  // } else {
  //   router.push({ name: 'tripPlan' })
  // }
  router.push({ name: 'tripPlan' })
}

function moveLogin() {
  router.push({ name: 'login' })
}

function moveRegister() {
  router.push({ name: 'register' })
}

function moveMyPlan() {
  console.log('isLogin = ' + isLogin.value)
  // if (!isLogin.value) {
  //   router.push({ name: '403page' })
  // } else {
  //   router.push({ name: 'myPlan' })
  // }
  router.push({ name: 'myPlan' })
}
</script>
