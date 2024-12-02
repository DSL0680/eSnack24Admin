
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
    // 알레르기정보값 없는 경우 해당 내용 표기
    res.data.dtoList = res.data.dtoList.map(item => ({
        ...item,
        allergyInfo: item.allergyInfo || "알레르기 유발 성분 없음"
    }));

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

// 제품명 기반 검색
export const searchProducts = async (searchParams) => {
    const res = await jwtAxios.get(`${host}/search`, {
        params: {
            ptitle_ko: searchParams.keyword || '',
            pcategory_ko: searchParams.pcategory_ko || '',
            page: searchParams.page || 1,
            size: searchParams.size || 10
        }
    });
    return res.data;
}

// 알레르기 기반 검색
export const searchProductsByAllergy = async (searchParams) => {
    const params = new URLSearchParams();
    params.append('page', searchParams.page || 1);
    params.append('size', searchParams.size || 10);

    // 배열을 개별 파라미터로 추가
    searchParams.allergySelectList.forEach(id => {
        params.append('allergySelectList', id);
    });

    const res = await jwtAxios.get(`${host}/search-allergy?${params.toString()}`);
    return res.data;
}