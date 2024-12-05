import jwtAxios from "../../util/jwtUtil.js";

const host = "http://localhost:8080/admin/api/v1/request/allergy";

export const getRequestAllergyList = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/list?page=${pageValue}`);

    console.log(res.data);

    return res.data;
}

export const getDetailRequestAllergy = async (cano) => {

    const res = await jwtAxios.get(`${host}/detail/${cano}`);

    console.log(res.data);

    return res.data;

}

export const updateRequestAllergy = async (cano, caanswer) => {
    const res = await jwtAxios.put(
        `${host}/answer/${cano}`,
        caanswer,
        {
            headers: {
                "Content-Type": "text/plain",
            },
        }
    );
    return res.data;
};

export const deleteRequestAllergy = async (cano) => {

    const res = await jwtAxios.delete(`${host}/delete/${cano}`)

    console.log(res.data)

    return res.data
}

export const getTRequestAllergyList = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/statuslist/true?page=${pageValue}`);

    console.log(res.data);

    return res.data;
}

export const getFRequestAllergyList = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/statuslist/false?page=${pageValue}`);

    console.log(res.data);

    return res.data;
}