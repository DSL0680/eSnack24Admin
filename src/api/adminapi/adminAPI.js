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

export const editAdmin = async (admno, updatedAdmin) => {

    const res = await jwtAxios.put(`${host}/edit/${admno}`, updatedAdmin);

    console.log(res.data);

    return res.data;
}

export const getAdminOne = async (admno) => {

    const res = await jwtAxios.get(`${host}/get/${admno}`);

    console.log(res.data);

    return res.data;
}

export const deleteAdmin = async (admno) => {

    const res = await jwtAxios.put(`${host}/delete/${admno}`);

    console.log(res.data);

    return res.data;
}

export const addAdmin = async (admin) => {

    const res = await jwtAxios.post(`${host}/add`, admin);

    console.log(res.data);

    return res.data;
}