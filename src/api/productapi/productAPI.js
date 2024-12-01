
import jwtAxios from "../../util/jwtUtil.js";

const host = 'http://localhost:8080/admin/api/v1/product';

// 제품 리스트 조회
export const getAllProducts = async (page) => {

    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/list?page=${pageValue}`);

    console.log(res.data);

    return res.data;
}

// 제품-알러지 리스트 조회
export const getProductAllergyList = async (page) => {
    const pageValue = (Number)(page || 1)

    const res = await jwtAxios.get(`${host}/allergy-list?page=${pageValue}`);

    console.log(res.data);

    return res.data;
}

// 제품 상세 조회
export const getProductDetail = async (pno) => {
    const res = await jwtAxios.get(`${host}/detail/${pno}`);

    console.log(res.data);

    return res.data;
}

// 제품 추가
export const registerProduct = async (product) => {
    const res = await jwtAxios.post(`${host}/add`, product);

    console.log(res.data);

    return res.data;
}

// 제품 수정
export const updateProduct = async (pno, updatedProduct) => {
    const res = await jwtAxios.put(`${host}/edit/${pno}`, updatedProduct);

    console.log(res.data);

    return res.data;
}

// 제품 삭제 (논리적 삭제)
export const deleteProduct = async (pno) => {
    const res = await jwtAxios.delete(`${host}/delete/${pno}`);

    console.log(res.data);

    return res.data;
}

// 제품정보 위주 검색
export const searchProducts = async (searchParams) => {
    const res = await jwtAxios.get(`${host}/search`, { params: searchParams });
    return res.data;
}

// 알러지정보 위주 검색
export const searchProductsByAllergy = async (allergyIds) => {
    const res = await jwtAxios.get(`${host}/allergy-search`, {
        params: { allergySelectList: allergyIds }
    });
    return res.data;
}