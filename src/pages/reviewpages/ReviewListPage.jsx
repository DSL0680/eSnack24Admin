import React from 'react';
import ReviewListComponent from "../../components/reviewcomponents/ReviewListComponent.jsx";

export const ReviewListTableHeader = [
    "제품명", "별점", "리뷰 내용", "사용자", "등록일"
];

export const ReviewListTablecolumn = [
    "rno", "ptitle_ko", "rstar", "rcontent",  "uemail", "rregdate"
];

function ReviewListPage() {
    return (
        <div>
            <ReviewListComponent />
        </div>
    );
}

export default ReviewListPage;