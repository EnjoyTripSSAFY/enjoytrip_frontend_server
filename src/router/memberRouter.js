import { storeToRefs } from 'pinia'
import { useMemberStore } from '@/stores/member'

const onlyAuthUser = async (to, from, next) => {
  const memberStore = useMemberStore()
  const { userInfo, isValidToken } = storeToRefs(memberStore)
  const { getUserInfo } = memberStore

  let token = sessionStorage.getItem('access-token')

  if (userInfo.value != null && token) {
    await getUserInfo(token)
  }
  if (!isValidToken.value || userInfo.value === null) {
    next({ name: 'user-login' })
  } else {
    next()
  }
}

const memberRouter = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue')
  },
  {
    path: '/mypage',
    name: 'user-mypage',
    beforeEnter: onlyAuthUser,
    component: () => import('@/components/users/UserMyPage.vue')
  },
  {
    path: '/update-mypage',
    name: 'user-update-mypage',
    beforeEnter: onlyAuthUser,
    component: () => import('@/components/users/UserUpdateMyPage.vue')
  }
]

export default memberRouter
