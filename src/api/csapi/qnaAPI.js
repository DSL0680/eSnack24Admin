import jwtAxios from "../../util/jwtUtil.js";


export const host  = 'http://localhost:8080/admin/api/v1/qna';

export const getQNAList = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/list?page=${pageValue}`);

    console.log("------")
    console.log(res.data);

    return res.data;
}

export const getTQNAList = async (page) => { // status = true

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/statuslist/true?page=${pageValue}`);

    return res.data;
}

export const getFQNAList = async (page) => { // status = false

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/statuslist/false?page=${pageValue}`);

    console.log("------")

    console.log(res.data);

    return res.data;
}

export const getQNAOne = async (qno) => {

    const res = await jwtAxios.get(`${host}/detail/${qno}`);

    console.log(res.data);

    return res.data;
}

export const answerQNA = async (admno, answerAdmin) => {

        const res = await jwtAxios.put(`${host}/answer/${admno}`, answerAdmin);

        console.log(res.data);

        return res.data;

}

export const removeQNA = async (qno) => {

    const res = await jwtAxios.put(`${host}/delete/${qno}`);

    console.log(res.data);

    return res.data;
}
