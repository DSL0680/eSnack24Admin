import jwtAxios from "../../util/jwtUtil.js";

const host = "http://localhost:8080/admin/api/v1/request/product";

export const getRequestProductList = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/list?page=${pageValue}`);

    console.log(res.data);

    return res.data;
}

export const getDetailRequestProduct = async (cpno) => {

    const res = await jwtAxios.get(`${host}/detail/${cpno}`);

    console.log(res.data);

    return res.data;

}

export const updateRequestProduct = async (cpno, cpanswer) => {
    const res = await jwtAxios.put(
        `${host}/answer/${cpno}`,
        cpanswer,
        {
            headers: {
                "Content-Type": "text/plain",
            },
        }
    );
    return res.data;
};




export const deleteRequestProduct = async (cpno) => {

    const res = await jwtAxios.delete(`${host}/delete/${cpno}`)

    console.log(res.data)

    return res.data
}

export const getTRequestProductList = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/statuslist/true?page=${pageValue}`);

    console.log(res.data);

    return res.data;
}

export const getFRequestProductList = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/statuslist/false?page=${pageValue}`);

    console.log(res.data);

    return res.data;
}

