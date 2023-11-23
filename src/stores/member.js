import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

import {
  userConfirm,
  findById,
  tokenRegeneration,
  logout,
  join,
  withdrawal,
  update
} from '@/api/memberApi'
import { httpStatusCode } from '@/util/http-status'

export const useMemberStore = defineStore('memberStore', () => {
  const router = useRouter()

  const isLogin = ref(false)
  const isLoginError = ref(false)
  const userInfo = ref({})
  const isValidToken = ref(false)

  const userLogin = async (loginUser) => {
    console.log('loginUser : ' + loginUser)
    await userConfirm(
      { ...loginUser },
      (response) => {
        let { data } = response
        if (data['httpStatus'] === 'CREATED') {
          let accessToken = data['result']['accessToken']
          let refreshToken = data['result']['refreshToken']

          console.log('accessToken : ' + accessToken)
          console.log('refreshToken : ' + refreshToken)
          isLogin.value = true
          isLoginError.value = false
          isValidToken.value = true

          let decodeToken = jwtDecode(accessToken)
          console.log('name in userLogin : ', decodeToken['sub'])
          userInfo.value = { name: decodeToken['sub'] }
          console.log(':::', userInfo.value.name)

          console.log('userInfo in userLogin : ' + userInfo.value)
          sessionStorage.setItem('access-token', accessToken)
          sessionStorage.setItem('refresh-token', refreshToken)
        } else {
          isLogin.value = false
          isLoginError.value = true
          isValidToken.value = false
        }
      },
      (error) => {
        console.error(error)
      }
    )
  }

  const userUpdate = async (updateUser) => {
    console.log('updateUser : ' + updateUser)
    await update(
      { ...updateUser },
      (response) => {
        console.log('update success!')
      },
      (error) => {
        console.error(error)
      }
    )
  }

  const userJoin = async (joinUser) => {
    console.log('joinUser : ' + joinUser)
    await join(
      { ...joinUser },
      (response) => {
        console.log('join success!')
      },
      (error) => {
        console.error(error)
      }
    )
  }

  const getUserInfo = async (token) => {
    let decodeToken = jwtDecode(token)
    console.log(decodeToken)
    console.log('name = ' + decodeToken['sub'])
    await findById(
      decodeToken['sub'],
      (response) => {
        let { data } = response
        if (data['httpStatus'] === 'OK') {
          userInfo.value = response.data.result

          console.log('userInfo in getUserInfo : ' + userInfo.value)
        } else {
          console.log('유저 정보 없음!!!!')
        }
      },
      async (error) => {
        console.error(
          'getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ',
          error.response.status
        )
        isValidToken.value = false

        await tokenRegenerate()
      }
    )
  }

  const tokenRegenerate = async () => {
    await tokenRegeneration(
      JSON.stringify(userInfo.value),
      (response) => {
        let { data } = response
        if (data['httpStatus'] === 'CREATED') {
          let accessToken = data['result']['accessToken']
          sessionStorage.setItem('access-token', accessToken)
          isValidToken.value = true
        }
      },
      async (error) => {
        // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
        if (error.response.status === httpStatusCode.UNAUTHORIZED) {
          // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
          await logout(
            userInfo.value.userid,
            (response) => {
              let { data } = response
              if (data['httpStatus'] === 'OK') {
                console.log('리프레시 토큰 제거 성공')
              } else {
                console.log('리프레시 토큰 제거 실패')
              }
              alert('RefreshToken 기간 만료!!! 다시 로그인해 주세요.')
              isLogin.value = false
              userInfo.value = null
              isValidToken.value = false
              router.push({ name: 'login' })
            },
            (error) => {
              console.error(error)
              isLogin.value = false
              userInfo.value = null
            }
          )
        }
      }
    )
  }

  const userLogout = async (userid) => {
    await logout(
      userid,
      (response) => {
        let { data } = response
        if (data['httpStatus'] === 'OK') {
          isLogin.value = false
          userInfo.value = null
          isValidToken.value = false
        } else {
          console.error('유저 정보 없음!!!!')
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  const userWithdrawal = async (userid) => {
    console.log('userid = ' + userid)
    await withdrawal(
      userid,
      (response) => {
        let { data } = response
        if (data['httpStatus'] === 'OK') {
          isLogin.value = false
          userInfo.value = null
          isValidToken.value = false
        } else {
          console.error('유저 정보 없음!!!!')
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  return {
    isLogin,
    isLoginError,
    userInfo,
    isValidToken,
    userLogin,
    getUserInfo,
    tokenRegenerate,
    userLogout,
    userJoin,
    userWithdrawal,
    userUpdate
  }
})
