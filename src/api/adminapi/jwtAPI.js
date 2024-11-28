import jwtAxios from "../../util/jwtUtil.js";
import axios from "axios";




const host = 'http://localhost:8080/admin/api/v1/jwt';

export const loginAdmin = async (tokenRequestDTO) => {

    const res = await axios.post(`${host}/makeToken`, tokenRequestDTO);

    console.log(res.data);

    return res.data;
}

export const logoutAdmin = async (admno) => {

    const res = await jwtAxios.post(`${host}/deleteToken?admno=${admno}`)

    return res.data;
}