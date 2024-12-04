import jwtAxios from "../../util/jwtUtil.js";


const host = "http://localhost:8080/admin/api/v1/graph";

// 유저 관련 그래프
export const getUserAllergyCount = async () => {

    const res = await jwtAxios.get(`${host}/user/allergy`)

    console.log("allergy--------------")
    console.log(res.data)

    return res.data

};

export const getUserAgeCount = async () => {

    const res = await jwtAxios.get(`${host}/user/age`)

    console.log("age--------")
    console.log(res.data)

    return res.data
};

export const getUserCountryCount = async () => {

    const res = await jwtAxios.get(`${host}/user/country`)

    console.log("country--------------")
    console.log(res.data)

    return res.data
};




// 제품 관련 그래프
// 카테고리별 제품 수 통계
export const getProductCategoryCount = async () => {

    const res = await jwtAxios.get(`${host}/product/category`);

    console.log("제품 카테고리 통계:");
    console.log(res.data);

    return res.data;
};

// 제품 알레르기 보유 통계
export const getProductAllergyCount = async () => {

    const res = await jwtAxios.get(`${host}/product/allergy`);

    console.log("제품 알레르기 통계:");
    console.log(res.data);

    return res.data;
};

// 제품 알레르기 보유 분포
export const getProductAllergyDistribution = async () => {

    const res = await jwtAxios.get(`${host}/product/allergy-distribution`);
    console.log("제품 알레르기 분포 통계:");
    console.log(res.data);

    return res.data;
};

// 재고 현황 통계
export const getProductStockStatus = async () => {
    const res = await jwtAxios.get(`${host}/product/stock-status`);

    console.log("제품 재고 현황 통계:");
    console.log(res.data);

    return res.data;
};

// 제품 별점 통계
export const getProductStarCount = async () => {
    const res = await jwtAxios.get(`${host}/product/star-count`);

    console.log("제품 별점 통계:");
    console.log(res.data);

    return res.data;
};

// 장바구니 통계
export const getProductCartCount = async () => {
    const res = await jwtAxios.get(`${host}/product/cart-count`);

    console.log("제품 장바구니 통계:");
    console.log(res.data);

    return res.data;
};

// 구매순 통계
export const getProductOrderCount = async () => {
    const res = await jwtAxios.get(`${host}/product/order-count`);

    console.log("제품 구매순 통계:");
    console.log(res.data);

    return res.data;
};