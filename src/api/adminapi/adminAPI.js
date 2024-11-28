import axios from "axios";

const host = 'http://localhost:8080/admin/api/v1/admin';

export const refreshRequest = async (accessToken, refreshToken) => {

    await axios.get(`${host}/refresh?refreshToken=${refreshToken}`, {
        headers: {'Authorization': `Bearer ${accessToken}`}
    })
}

export const getAllAdminList = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await axios.get(`${host}/list?page=${pageValue}`)

    console.log(res.data)

    return res.data;
}