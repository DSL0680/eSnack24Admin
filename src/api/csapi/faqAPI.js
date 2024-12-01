import jwtAxios from "../../util/jwtUtil.js";


export const host  = 'http://localhost:8080/admin/api/v1/faq';

export const getFAQList = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/list?page=${pageValue}`);

    console.log(res.data);

    return res.data;
}

export const getFAQOne = async (fno) => {

    const res = await jwtAxios.get(`${host}/detail/${fno}`);

    console.log(res.data);

    return res.data;

}

export const getFAQEdit = async (fno, EditData) => {

    const res = await jwtAxios.put(`${host}/edit/${fno}`, EditData);

    console.log(res.data);

    return res.data;
}

export const getFAQRemove = async (fno) => {

    const res = await jwtAxios.put(`${host}/delete/${fno}`);

    console.log(res.data);

    return res.data;
}

export const addFAQ = async (addData) => {

    const res = await jwtAxios.post(`${host}/add`, addData)

    console.log(res.data);

    return res.data;

}