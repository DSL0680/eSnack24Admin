import axios from "axios";
import {Cookies} from "react-cookie";
import {refreshRequest} from "../api/adminapi/adminAPI.js";


const cookies = new Cookies();

const jwtAxios = axios.create()

const beforeReq = (config) => {

    console.log("beforeRequest")

    const adminCookie = cookies.get("auth", {path: '/'})

    if(!adminCookie || !adminCookie.accessToken){

        console.log(adminCookie)

        throw new Error('admin Cookie not found')
    }

    const accessToken = adminCookie?.accessToken

    console.log("accessToken", accessToken)

    if(accessToken){

        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config;
}

const failReq = (error) => {

    console.log("fail Request")

    return Promise.reject(error)
}

const beforeRes = async (res) => {

    console.log("beforeResponse")

    const data = res.data

    if(data.error && data.error === 'ERROR_ACCESS_TOKEN') {

        console.log('accessToken에 문제가 있음')

        const adminCookie = cookies.get("auth", {path: '/'})
        const {accessToken, refreshToken} = adminCookie

        const refreshResult = await refreshRequest(accessToken, refreshToken)

        console.log("refreshResult", refreshResult)

        adminCookie.accessToken = refreshResult.accessToken
        adminCookie.refreshToken = refreshResult.refreshToken

        cookies.set("auth", adminCookie, {path: '/', maxAge: (60* 60 * 24 * 7)})

        const originalRequest = res.config
        originalRequest.headers.Authorization = `Bearer ${refreshResult.accessToken}`

        return await axios(originalRequest)
    }

    return res;
}

const failRes = (error) => {

    console.log("fail Response")

    return Promise.reject(error)
}

jwtAxios.interceptors.request.use(beforeReq, failReq)
jwtAxios.interceptors.response.use(beforeRes, failRes)


export default jwtAxios