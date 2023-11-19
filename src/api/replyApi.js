import axios from 'axios'


const endPoint = 'http://localhost:8080/reply/'

const config = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
};
const listReply =  async (param, success, fail) => {
    const url = `${endPoint}${param}`

    axios.get(url)
        .then(success)
        .catch(fail)
}

const registReply =  async (param, success, fail) => {
    const url = endPoint

    axios.post(url, param, config)
        .then(success)
        .catch(fail)
}

const deleteReply =  async (param, success, fail) => {
    const url = endPoint

    axios.delete(url, {
        data: {
            ...param
        },
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
        .then(success)
        .catch(fail)
}

const modifyReply =  async (param, success , fail) => {
    const url = `${endPoint}modify`

    axios.put(url, param, config)
        .then(success)
        .catch(fail)
}

export {listReply, registReply, deleteReply, modifyReply }