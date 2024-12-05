import jwtAxios from "../../util/jwtUtil.js";

const host = 'http://localhost:8080/admin/api/v1/review';


// 리뷰 리스트 조회
export const getReviewList = async (page = 1, size = 10) => {
    const res = await jwtAxios.get(`${host}/list`, {params: { page, size }});

    console.log(res.data);
    return res.data;
};

// 리뷰 상세 조회
export const getReviewDetail = async (rno) => {
    const res = await jwtAxios.get(`${host}/detail/${rno}`);

    console.log(res.data);
    return res.data;
};

// 리뷰 삭제
export const deleteReview = async (rno) => {
    const res = await jwtAxios.delete(`${host}/delete/${rno}`);

    console.log(res.data);
    return res.data;
};