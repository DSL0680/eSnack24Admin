import axios from "axios";

const host = 'http://localhost:8080/admin/api/v1/product';

export const getAllProducts = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await axios.get(`${host}/list?page=${pageValue}`);

    console.log(res.data);

    return res.data;
}