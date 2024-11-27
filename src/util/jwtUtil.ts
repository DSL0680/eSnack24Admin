// import axios, {AxiosResponse, InternalAxiosRequestConfig} from "axios";
// import {Cookies} from "react-cookie";
// import {refreshRequest} from "../api/memberAPI.ts";
//
//
// const cookies = new Cookies();
//
// const jwtAxios = axios.create()
//
// const beforeReq = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
//
//     console.log("beforeRequest")
//
//     const memberCookie = cookies.get("member", {path: '/'})
//
//     if(!memberCookie || !memberCookie.accessToken){
//
//         throw new Error('Member Cookie not found')
//     }
//
//     const accessToken = memberCookie?.accessToken
//
//     console.log("accessToken", accessToken)
//
//     if(accessToken){
//
//         config.headers.Authorization = `Bearer ${accessToken}`
//     }
//
//     return config;
// }
//
// const failReq = (error: any) => {
//
//     console.log("fail Request")
//
//     return Promise.reject(error)
// }
//
// const beforeRes = async (res: AxiosResponse): Promise<AxiosResponse> => {
//
//     console.log("beforeResponse")
//
//     const data = res.data
//
//     if(data.error && data.error === 'ERROR_ACCESS_TOKEN') {
//
//         console.log('accessToken에 문제가 있음')
//
//         const memberCookie = cookies.get("member", {path: '/'})
//         const {accessToken, refreshToken} = memberCookie
//
//         const refreshResult = await refreshRequest(accessToken, refreshToken)
//
//         console.log("refreshResult", refreshResult)
//
//         memberCookie.accessToken = refreshResult.accessToken
//         memberCookie.refreshToken = refreshResult.refreshToken
//
//         cookies.set("member", memberCookie, {path: '/', maxAge: (60* 60 * 24 * 7)})
//
//         const originalRequest = res.config
//         originalRequest.headers.Authorization = `Bearer ${refreshResult.accessToken}`
//
//         return await axios(originalRequest)
//     }
//
//     return res;
// }
//
// const failRes = (error: any) => {
//
//     console.log("fail Response")
//
//     return Promise.reject(error)
// }
//
// jwtAxios.interceptors.request.use(beforeReq, failReq)
// jwtAxios.interceptors.response.use(beforeRes, failRes)
//
//
// export default jwtAxios