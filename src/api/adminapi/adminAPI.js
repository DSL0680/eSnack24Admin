import axios from "axios";
import jwtAxios from "../../util/jwtUtil.js";

const host = 'http://localhost:8080/admin/api/v1/admin';

export const refreshRequest = async (accessToken, refreshToken) => {

    await axios.get(`${host}/refresh?refreshToken=${refreshToken}`, {
        headers: {'Authorization': `Bearer ${accessToken}`}
    })
}

export const getAllAdminList = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/list?page=${pageValue}`)

    console.log(res.data)

    return res.data;
}