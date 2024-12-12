import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReviewDetail, deleteReview } from '../../api/productapi/reviewAPI';
import CommonModal from "../../common/CommonModal.jsx";

function ReviewDetailComponent() {
    const [review, setReview] = useState(null);
    const { rno } = useParams();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

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
        try {
            await deleteReview(rno);
            navigate('/review/list');
        } catch (error) {
            console.error('리뷰 삭제 실패:', error);
        }
    };

    const handleDeleteClick = () => {
        setModalOpen(true);
    };

    if (!review) return <div>로딩 중...</div>;

    return (
        <>
            {modalOpen && (
                <CommonModal
                    isOpen={modalOpen}
                    msg="리뷰를 삭제"
                    fn={handleDeleteReview}
                    closeModal={() => {
                        setModalOpen(false);
                        navigate('/review/list');
                    }}
                    cancelFn={() => setModalOpen(false)}
                />
            )}

            <div className="max-w-6xl mx-auto p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">리뷰 상세 정보</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/*리뷰 이미지*/}
                    {review.rimage ? (
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src={`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/review/${review.rimage}`}
                                alt="리뷰 이미지"
                                className="w-full h-[500px] object-contain"
                            />
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
                            <p className="text-gray-500 text-center">사용자가 업로드한 이미지가 없습니다</p>
                        </div>
                    )}

                    {/* 리뷰 정보 섹션 */}
                    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                        <div className="space-y-4">
                            <div className="mb-4">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">제품명</h3>
                                <p className="text-lg text-gray-600">{review.ptitle_ko}</p>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">사용자</h3>
                                <p className="text-gray-700">{review.uemail}</p>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">별점</h3>
                                <p className="text-xl font-bold text-yellow-600">{review.rstar}점</p>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">내용</h3>
                                <p className="text-gray-700 whitespace-pre-line">{review.rcontent}</p>
                            </div>

                            <div className="border-t pt-4 text-sm text-gray-500">
                                <p>등록일: {new Date(review.rregdate).toLocaleString()}</p>
                            </div>
                        </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => navigate('/review/list')}
                        className="mt-6 px-6 py-2 bg-[#6B7280] text-white font-semibold rounded-lg shadow-md hover:bg-[#4B5D62] transition"
                    >
                        목록으로
                    </button>
                    <button
                        onClick={handleDeleteClick}
                        className="mt-6 px-6 py-2 bg-[#F57C00] text-white font-semibold rounded-lg shadow-md hover:bg-[#F57C00] transition"
                    >
                        삭제
                    </button>
                </div>
            </div>
            </div>
        </div>
        </>
    )
        ;
}

export default ReviewDetailComponent;