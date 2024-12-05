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
        if (page) navigate(`/product/list?page=${page}`);
        else navigate('/product/list');
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
                        navigate('/product/list');
                    }}
                    cancelFn={() => setModalOpen(false)}
                />
            )}

            <div className="max-w-6xl mx-auto p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">제품 상세 정보</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 제품 이미지 */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                            src={`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/product/${product.pfilename}`}
                            alt={product.ptitle_ko}
                            className="w-full h-[500px] object-contain"
                        />
                    </div>

                    {/* 제품 정보 섹션 */}
                    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                        {/* 제품명 (다국어) */}
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-gray-800">{product.ptitle_ko}</h3>
                            <p className="text-sm text-gray-600">{product.ptitle_en}</p>
                            <p className="text-sm text-gray-600">{product.ptitle_ja}</p>
                            <p className="text-sm text-gray-600">{product.ptitle_zh}</p>
                        </div>

                        {/* 카테고리 */}
                        <div className="border-t pt-4">
                            <p className="text-lg text-gray-600">{product.pcategory_ko}</p>
                        </div>

                        {/* 상세 설명 (다국어) */}
                        <div className="border-t pt-4">
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
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">알레르기 정보</h4>
                            <p className="text-gray-700">
                                {product.allergyInfo || "알레르기 유발성분 없음"}
                            </p>
                        </div>

                        {/* 가격 및 재고 */}
                        <div className="border-t pt-4">
                            <p className="text-xl font-semibold text-gray-900">
                                가격: {product.price?.toLocaleString()}원
                            </p>
                            <p className="text-xl font-semibold text-gray-900">
                                재고: {product.pqty}개
                            </p>
                        </div>
                    </div>


                        <div className="border-t pt-4 text-sm text-gray-500">
                            <p>등록일: {formatDate(product.pregdate)}</p>
                            <p>수정일: {formatDate(product.pmoddate)}</p>
                        </div>

                        <div className="flex justify-between pt-6">
                            <button
                                onClick={handleBackClick}
                                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                            >
                                목록으로
                            </button>
                            <div className="space-x-4">
                                <button
                                    onClick={() => navigate(`/product/edit/${pno}`)}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
                </div>
        </>
    );
}

export default ProductDetailComponent;