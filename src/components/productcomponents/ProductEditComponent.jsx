import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetail, editProduct } from '../../api/productapi/productAPI';

const PRODUCT_CATEGORIES = [
    "칩", "쿠키/크래커", "쥐포/안주스낵", "과자류",
    "초콜릿/캔디", "견과일/넛트류", "젤리/푸딩"
];

const ALLERGY_TYPES = [
    { id: 1, name: "계란" }, { id: 2, name: "우유" }, { id: 3, name: "메밀" },
    { id: 4, name: "밀" }, { id: 5, name: "대두" }, { id: 6, name: "호두" },
    { id: 7, name: "땅콩" }, { id: 8, name: "잣" }, { id: 9, name: "복숭아" },
    { id: 10, name: "토마토" }, { id: 11, name: "돼지고기" }, { id: 12, name: "쇠고기" },
    { id: 13, name: "닭고기" }, { id: 14, name: "고등어" }, { id: 15, name: "새우" },
    { id: 16, name: "홍합" }, { id: 17, name: "전복" }, { id: 18, name: "굴" },
    { id: 19, name: "조개류" }, { id: 20, name: "게" }, { id: 21, name: "오징어" }
];

function ProductEditComponent() {
    const { pno } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ptitle_ko: '', pcontent_ko: '', pcategory_ko: '',
        ptitle_en: '', pcontent_en: '', pcategory_en: '',
        ptitle_ja: '', pcontent_ja: '', pcategory_ja: '',
        ptitle_zh: '', pcontent_zh: '', pcategory_zh: '',
        price: "", pqty: "", pfilename: '',
        allergySelectList: []
    });
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        getProductDetail(pno).then(res => {
            // 알레르기 정보 안전하게 변환
            const allergyList = res.allergyInfo
                ? res.allergyInfo.split(',')
                    .map(id => Number(id))
                    .filter(id => !isNaN(id))  // NaN 값 제거
                : [];

            setFormData({
                ...res,
                allergySelectList: allergyList
            });

            setPreviewImage(`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/product/${res.pfilename}`);
        });
    }, [pno]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'pqty'
                ? value === '' ? '' : Number(value)
                : value
        }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        // 파일 선택 로깅
        console.log('선택된 파일:', file);

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const base64String = reader.result;

                // Base64 변환 로깅
                console.log('Base64 문자열 길이:', base64String.length);
                console.log('Base64 문자열 시작:', base64String.substring(0, 50));

                setFormData(prev => {
                    const newFormData = {
                        ...prev,
                        pfilename: base64String
                    };

                    // 폼 데이터 변경 로깅
                    console.log('파일 변경 후 폼 데이터:', newFormData);

                    return newFormData;
                });

                setPreviewImage(URL.createObjectURL(file));

                // 미리보기 이미지 생성 로깅
                console.log('미리보기 이미지 생성');
            };

            reader.readAsDataURL(file);
        }
    };

    const handleAllergyToggle = (allergyId) => {
        // 토글 전 현재 알레르기 리스트 로깅
        console.log('현재 알레르기 리스트:', formData.allergySelectList);
        console.log('토글할 알레르기 ID:', allergyId);

        setFormData(prev => {
            const newAllergyList = prev.allergySelectList.includes(allergyId)
                ? prev.allergySelectList.filter(id => id !== allergyId)
                : [...prev.allergySelectList, allergyId];

            // 변경된 알레르기 리스트 로깅
            console.log('변경된 알레르기 리스트:', newAllergyList);

            return {
                ...prev,
                allergySelectList: newAllergyList
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 원본 폼 데이터 로깅
            console.log('원본 formData:', formData);

            const submitData = { ...formData };

            // 이미지 처리 로깅
            console.log('원본 이미지 파일명:', submitData.pfilename);

            // 이미지 처리 강화
            if (submitData.pfilename) {
                console.log('이미지 처리 시작');
                if (!submitData.pfilename.startsWith('data:image')) {
                    console.log('유효하지 않은 이미지 형식, 삭제 처리');
                    delete submitData.pfilename;
                }
            }

            // 알레르기 정보 로깅
            console.log('원본 알레르기 리스트:', submitData.allergySelectList);

            // 알레르기 정보 안전한 처리
            submitData.allergySelectList = submitData.allergySelectList
                ? submitData.allergySelectList
                    .filter(id => {
                        console.log('알레르기 ID 필터링:', id);
                        return id !== null && id !== undefined;
                    })
                    .map(Number)  // 숫자 타입으로 변환
                : [];

            console.log('필터링 후 알레르기 리스트:', submitData.allergySelectList);

            // 숫자 타입 변환 로깅
            console.log('변환 전 가격:', submitData.price);
            console.log('변환 전 수량:', submitData.pqty);

            // 숫자 타입 변환 및 유효성 검사
            submitData.price = Number(submitData.price);
            submitData.pqty = Number(submitData.pqty);

            console.log('변환 후 가격:', submitData.price);
            console.log('변환 후 수량:', submitData.pqty);

            // 데이터 유효성 검사
            if (isNaN(submitData.price) || isNaN(submitData.pqty)) {
                console.error('가격 또는 수량 변환 오류');
                alert('가격과 수량은 숫자여야 합니다.');
                return;
            }

            // 최종 전송 데이터 로깅
            console.log('최종 전송 데이터:', submitData);

            await editProduct(pno, submitData);
            navigate('/product/search');
        } catch (error) {
            // 에러 상세 로깅
            console.error('제품 수정 실패:', error);
            console.error('에러 상세:', error.response?.data);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h2 className="text-2xl font-bold mb-6">제품 수정</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">제품 이미지</span>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="mt-1 block w-full"
                        />
                    </label>
                    {previewImage && (
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="w-64 h-64 object-contain"
                        />
                    )}
                </div>

                {/* 2. 카테고리 선택 */}
                <div>
                    <label className="block text-gray-700 mb-2">카테고리</label>
                    <select
                        name="pcategory_ko"
                        value={formData.pcategory_ko}
                        onChange={handleInputChange}
                        className="w-full rounded-md border-gray-300 shadow-sm"
                        required
                    >
                        <option value="">카테고리 선택</option>
                        {PRODUCT_CATEGORIES.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">한국어 정보</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="ptitle_ko"
                                value={formData.ptitle_ko}
                                onChange={handleInputChange}
                                placeholder="제품명 (한국어)"
                                className="w-full p-2 border rounded"
                            />
                            <textarea
                                name="pcontent_ko"
                                value={formData.pcontent_ko}
                                onChange={handleInputChange}
                                placeholder="제품 설명 (한국어)"
                                className="w-full p-2 border rounded"
                                rows="3"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">영어 정보</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="ptitle_en"
                                value={formData.ptitle_en}
                                onChange={handleInputChange}
                                placeholder="Product Name (English)"
                                className="w-full p-2 border rounded"
                            />
                            <textarea
                                name="pcontent_en"
                                value={formData.pcontent_en}
                                onChange={handleInputChange}
                                placeholder="Product Description (English)"
                                className="w-full p-2 border rounded"
                                rows="3"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">일본어 정보</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="ptitle_ja"
                                value={formData.ptitle_ja}
                                onChange={handleInputChange}
                                placeholder="製品名 (日本語)"
                                className="w-full p-2 border rounded"
                            />
                            <textarea
                                name="pcontent_ja"
                                value={formData.pcontent_ja}
                                onChange={handleInputChange}
                                placeholder="製品説明 (日本語)"
                                className="w-full p-2 border rounded"
                                rows="3"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">중국어 정보</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="ptitle_zh"
                                value={formData.ptitle_zh}
                                onChange={handleInputChange}
                                placeholder="产品名称 (中文)"
                                className="w-full p-2 border rounded"
                            />
                            <textarea
                                name="pcontent_zh"
                                value={formData.pcontent_zh}
                                onChange={handleInputChange}
                                placeholder="产品描述 (中文)"
                                className="w-full p-2 border rounded"
                                rows="3"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">알레르기 정보</h3>
                    <div className="grid grid-cols-7 gap-2">
                        {ALLERGY_TYPES.map(allergy => (
                            <button
                                type="button"
                                key={allergy.id}
                                onClick={() => handleAllergyToggle(allergy.id)}
                                className={`p-2 rounded ${
                                    formData.allergySelectList.includes(allergy.id)
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200'
                                }`}
                            >
                                {allergy.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">가격</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">수량</label>
                        <input
                            type="number"
                            name="pqty"
                            value={formData.pqty}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/product/list')}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        수정
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductEditComponent;