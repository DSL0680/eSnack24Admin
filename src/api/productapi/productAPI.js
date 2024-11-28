import axios from "axios";
import jwtAxios from "../../util/jwtUtil.js";

const host = 'http://localhost:8080/admin/api/v1/product';

export const getAllProducts = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = jwtAxios.get(`${host}/list?page=${pageValue}`);

    console.log(res.data);

    return res.data;
}