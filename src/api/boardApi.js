import axios from 'axios'


const endPoint = 'http://localhost:8080/board/'

const postBoard =  async (param, success , fail) => {
  const url = endPoint
  const config = {
    headers: {
      'Content-Type': 'application/json', // Set the content type based on your API requirements
    },
  };

  axios.post(url, param, config)
      .then(success)
      .catch(fail)
}

const detailBoard =  async (param, success, fail) => {
  const url = `${endPoint}${param}`

  axios.get(url)
      .then(success)
      .catch(fail)
}

const editBoard = async (param, success , fail) => {
  const url = `${endPoint}`

  const config = {
    headers: {
      'Content-Type': 'application/json', // Set the content type based on your API requirements
    },
  };

  axios.put(url, param, config)
      .then(success)
      .catch(fail)
}

const deleteBoard = async (param, success , fail) => {
  const url = `${endPoint}/${param}`

  const config = {
    headers: {
      'Content-Type': 'application/json', // Set the content type based on your API requirements
    },
  };

  axios.delete(url)
      .then(success)
      .catch(fail)
}


export { postBoard, detailBoard, editBoard , deleteBoard}
