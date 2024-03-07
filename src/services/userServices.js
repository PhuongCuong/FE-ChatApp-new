import axios from '../setup/axios'

const test = () => {
    return axios.get("/api/v1")
}

const registerService = (data) => {
    return axios.post("/api/v1/register", data)
}

const loginService = (data) => {
    return axios.post("/api/v1/login", data)
}

const accountUser = () => {
    return axios.get("/api/v1/account")
}

export {
    test, registerService, loginService, accountUser
}