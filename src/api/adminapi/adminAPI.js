import axios from "axios";
import jwtAxios from "../../util/jwtUtil.js";
import * as res from "autoprefixer";

const host = `${import.meta.env.VITE_API_HOST}/admin`;

export const refreshRequest = async (accessToken, refreshToken) => {

    await axios.get(`${host}/refresh?refreshToken=${refreshToken}`, {
        headers: {'Authorization': `Bearer ${accessToken}`}
    })
}

export const getElseAdminList = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/list?page=${pageValue}`)

    console.log(res.data)

    return res.data;
}

export const getAllAdminList = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/roleList/ALL?page=${pageValue}`)

    console.log(res.data)

    return res.data;
}

export const getCSAdminList = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/roleList/CS?page=${pageValue}`)

    console.log(res.data)

    return res.data;
}

export const getAdminWorkListAsc = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/workList/ASC?page=${pageValue}`)

    console.log(res.data)

    return res.data;
}

export const getAdminWorkListDesc = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/workList/DESC?page=${pageValue}`)

    console.log(res.data)

    return res.data;
}

export const getAdminAnswerList = async (admno, page) => {

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/answerList/${admno}?page=${pageValue}`);

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

export const registerAdmin = async (admin) => {

    const res = await jwtAxios.post(`${host}/add`, admin);

    console.log(res.data);

    return res.data;
}