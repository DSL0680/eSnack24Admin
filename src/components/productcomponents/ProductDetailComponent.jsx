import React, { useEffect, useState } from 'react';
import { getProductDetail, deleteProduct } from "../../api/productapi/productAPI.js";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import CommonModal from "../../common/CommonModal.jsx";
import { formatDate } from "../../common/CommonTableComponent.jsx";

const init = {
    pno: '',
    ptitle_ko: '',
    pcontent_ko: '',
    pcategory_ko: '',
    price: 0,
    pqty: 0,
    pfilename: '',
    pregdate: '',
    pmoddate: '',
    allergyInfo: ''
};

function ProductDetailComponent() {
    const [product, setProduct] = useState(init);
    const [modalOpen, setModalOpen] = useState(false);
    const { pno } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");

    useEffect(() => {
        getProductDetail(pno).then((res) => {
            setProduct(res);
        });
    }, [pno]);

    const handleDeleteClick = () => {
        setModalOpen(true);
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <>
            {modalOpen && (
                <CommonModal
                    isOpen={modalOpen}
                    msg="삭제"
                    fn={() => deleteProduct(pno)}
                    closeModal={() => {
                        setModalOpen(false);
                        navigate('/product/search');
                    }}
                    cancelFn={() => setModalOpen(false)}
                />
            )}

            <div className="max-w-6xl mx-auto p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">제품 상세 정보</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 왼쪽 섹션: 이미지, 제품명, 카테고리 */}
                    <div className="space-y-6">
                        {/* 제품 이미지 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src={`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/product/${product.pfilename}`}
                                alt={product.ptitle_ko}
                                className="w-full h-[400px] object-contain"
                            />
                        </div>

                        {/* 제품명 (다국어) */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h4 className="text-lg font-semibold text-black mb-4 flex items-center">
                                <span className="w-1.5 h-6 bg-[#F9BB00] rounded-full mr-2"></span>
                                상품명
                            </h4>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.ptitle_ko}</h3>
                            <p className="text-sm text-gray-600">{product.ptitle_en}</p>
                            <p className="text-sm text-gray-600">{product.ptitle_ja}</p>
                            <p className="text-sm text-gray-600">{product.ptitle_zh}</p>
                        </div>

                        {/* 카테고리 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h4 className="text-lg font-semibold text-black mb-4 flex items-center">
                                <span className="w-1.5 h-6 bg-[#F9BB00] rounded-full mr-2"></span>
                                카테고리
                            </h4>
                            <p className="text-lg text-gray-600">{product.pcategory_ko}</p>
                        </div>
                    </div>

                    {/* 오른쪽 섹션: 상세 설명, 알레르기 정보, 가격 및 재고 */}
                    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                        {/* 상세 설명 (다국어) */}
                        <div>
                            <h4 className="text-lg font-semibold text-black mb-4 flex items-center">
                                <span className="w-1.5 h-6 bg-[#F9BB00] rounded-full mr-2"></span>
                                상품 상세
                            </h4>
                            <p className="text-lg font-semibold text-gray-800 whitespace-pre-line mb-4">
                                {product.pcontent_ko}
                            </p>
                            <p className="text-sm text-gray-600 whitespace-pre-line mb-2">
                                {product.pcontent_en}
                            </p>
                            <p className="text-sm text-gray-600 whitespace-pre-line mb-2">
                                {product.pcontent_ja}
                            </p>
                            <p className="text-sm text-gray-600 whitespace-pre-line">
                                {product.pcontent_zh}
                            </p>
                        </div>

                        {/* 알레르기 정보 */}
                        <div className="border-t pt-4">
                            <h4 className="text-lg font-semibold text-black mb-4 flex items-center">
                                <span className="w-1.5 h-6 bg-[#F9BB00] rounded-full mr-2"></span>
                                알레르기 정보
                            </h4>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                {product.allergyInfo ? (
                                    <ul className="list-disc pl-5 space-y-1">
                                        {product.allergyInfo.split(',').map((allergy, index) => (
                                            <li key={index} className="text-yellow-700">{allergy.trim()}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-green-600 font-medium">알레르기 유발성분 없음</p>
                                )}
                            </div>
                        </div>

                        {/* 가격 및 재고 */}
                        <div className="border-t pt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                                    <span className="text-gray-600">가격</span>
                                    <span className="text-xl font-bold text-black">
                                        {product.price?.toLocaleString()}
                                        <span className="text-base ml-1">원</span>
                                    </span>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                                    <span className="text-gray-600">재고</span>
                                    <span className="text-xl font-bold text-blue-600">
                                        {product.pqty}
                                        <span className="text-base ml-1">개</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 날짜 정보 */}
                        <div className="border-t pt-4 text-sm text-gray-500">
                            <p>등록일: {formatDate(product.pregdate)}</p>
                            <p>수정일: {formatDate(product.pmoddate)}</p>
                        </div>
                    </div>
                </div>

                {/* 버튼 섹션 */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleBackClick}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                    >
                        목록으로
                    </button>
                    <div className="space-x-4">
                        <button
                            onClick={() => navigate(`/product/edit/${pno}`)}
                            className="px-6 py-3 bg-[#F9BB00] text-white rounded-lg hover:bg-[#F9BB00] transition"
                        >
                            수정
                        </button>
                        <button
                            onClick={handleDeleteClick}
                            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetailComponent;