import jwtAxios from "../../util/jwtUtil.js";

const host = `${import.meta.env.VITE_API_HOST}/user`;

export const getAllUsers = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/list?page=${pageValue}`);

    console.log(res.data);

    return res.data;
}

export const getDetailUser = async (uno) => {

    const res = await jwtAxios.get(`${host}/detail/${uno}`);

    console.log(res.data);

    return res.data;

}
