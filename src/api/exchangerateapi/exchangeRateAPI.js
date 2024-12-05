import axios from "axios";

const host = 'http://localhost:8080/admin/api/v1/exchange_rate'

export const createExchangeRate = async (data) => {

    const res = await axios.post(`${host}/create`, data);

    return res.data;
}

export const editExchangeRate = async (data) => {

    const res = await axios.put(`${host}/edit`, data);

    return res.data;
}

export const deleteExchangeRate = async (data) => {

    const res = await axios.put(`${host}/delete`, data);

    return res.data;
}

export const listExchangeRate = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await axios.get(`${host}/list?page=${pageValue}`);

    return res.data;
}

export const readExchangeRate = async (erno) => {

    const res = await axios.get(`${host}/read/${erno}`);

    return res.data;
}

export const checkExchangeRate = async (data) => {

    const res = await axios.get(`${host}/check`, data);

    return res.data;
}