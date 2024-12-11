import jwtAxios from "../../util/jwtUtil.js";

const host = `${import.meta.env.VITE_API_HOST}/exchange_rate`

export const createExchangeRate = async (data) => {

    const res = await jwtAxios.post(`${host}/create`, data);

    return res.data;
}

export const editExchangeRate = async (data) => {

    const res = await jwtAxios.put(`${host}/edit`, data);

    return res.data;
}

export const deleteExchangeRate = async (data) => {

    const res = await jwtAxios.put(`${host}/delete`, data);

    return res.data;
}

export const listExchangeRate = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/list?page=${pageValue}`);

    return res.data;
}

export const readExchangeRate = async (erno) => {

    const res = await jwtAxios.get(`${host}/read/${erno}`);

    return res.data;
}

export const checkExchangeRate = async (data) => {

    const res = await jwtAxios.get(`${host}/check`, {
        params: { targetCurrency: data }
    });

    console.log(res);

    return res.data;
};
