import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReviewDetail, deleteReview } from '../../api/productapi/reviewAPI';

function ReviewDetailComponent() {
    const [review, setReview] = useState(null);
    const { rno } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchReviewDetail();
    }, [rno]);

    const fetchReviewDetail = async () => {
        try {
            const data = await getReviewDetail(rno);
            setReview(data);
        } catch (error) {
            console.error('리뷰 상세 조회 실패:', error);
        }
    };

    const handleDeleteReview = async () => {
        if (window.confirm('정말 이 리뷰를 삭제하시겠습니까?')) {
            try {
                await deleteReview(rno);
                navigate('/review/list');
            } catch (error) {
                console.error('리뷰 삭제 실패:', error);
            }
        }
    };

    if (!review) return <div>로딩 중...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">리뷰 상세</h1>
            <div className="bg-white shadow-md rounded p-6">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">제품명</label>
                    <p>{review.ptitle_ko}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">사용자</label>
                    <p>{review.uemail}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">별점</label>
                    <p>{review.rstar}점</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">내용</label>
                    <p>{review.rcontent}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">등록일</label>
                    <p>{new Date(review.rregdate).toLocaleString()}</p>
                </div>
                {review.rimage && (
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">이미지</label>
                        <img
                            src={`https://esnack24-review-bucket.s3.ap-northeast-2.amazonaws.com/review/${review.rimage}`}
                            alt="리뷰 이미지"
                            className="max-w-full h-auto"
                        />
                    </div>
                )}
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => navigate('/review/list')}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        목록
                    </button>
                    <button
                        onClick={handleDeleteReview}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReviewDetailComponent;