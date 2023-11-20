import { localAxios } from '@/util/http-commons'

const local = localAxios()

async function userConfirm(param, success, fail) {
  console.log('params : ' + param)
  await local.post(`/auth/member/login`, param).then(success).catch(fail)
}

async function findById(userid, success, fail) {
  local.defaults.headers['access-token'] = sessionStorage.getItem('access-token')
  await local.get(`/auth/member/info/${userid}`).then(success).catch(fail)
}

async function tokenRegeneration(user, success, fail) {
  local.defaults.headers['refresh-token'] = sessionStorage.getItem('refresh-token') //axios header에 refresh-token 셋팅
  await local.post(`/auth/member/refresh`, user).then(success).catch(fail)
}

async function logout(userid, success, fail) {
  await local.get(`/auth/member/logout/${userid}`).then(success).catch(fail)
}

export { userConfirm, findById, tokenRegeneration, logout }

// import { localAxios } from '@/util/http-commons'

// const axios = localAxios()

// const config = {
//   headers: {
//     'Content-Type': 'application/json', // Set the content type based on your API requirements
//   },
// };

// axios.put(`/auth/member/login`, param, config)
//     .then(success)
//     .catch(fail)
