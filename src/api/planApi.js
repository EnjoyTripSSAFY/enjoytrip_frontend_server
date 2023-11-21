import axios from 'axios'

const endPoint = 'http://localhost:8080/plan/'

const config = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
}
const listTripPlan = async (param, success, fail) => {
  const url = `${endPoint}${param}`

  axios.get(url).then(success).catch(fail)
}

const listPlanPerDateAndDetail = async (param, success, fail) => {
  const url = `${endPoint}detail/${param}`

  axios.get(url).then(success).catch(fail)
}

const createTripPlanAndPlanPerDateAndDetailPlan = async (param, success, fail) => {
  const url = endPoint

  axios.post(url, param, config).then(success).catch(fail)
}

export { listTripPlan, listPlanPerDateAndDetail, createTripPlanAndPlanPerDateAndDetailPlan }

// const deletePlan = async (param, success, fail) => {
//   const url = endPoint

//   axios
//     .delete(url, {
//       data: {
//         ...param
//       },
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//       }
//     })
//     .then(success)
//     .catch(fail)
// }

// const modifyPlan = async (param, success, fail) => {
//   const url = `${endPoint}modify`

//   axios.put(url, param, config).then(success).catch(fail)
// }

// export { listReply, registReply, deleteReply, modifyReply }
