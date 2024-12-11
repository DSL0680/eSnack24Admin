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

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result;
                setFormData(prev => ({
                    ...prev,
                    pfilename: base64String
                }));
                setPreviewImage(URL.createObjectURL(file));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAllergyToggle = (allergyId) => {
        setFormData(prev => {
            const newAllergyList = prev.allergySelectList.includes(allergyId)
                ? prev.allergySelectList.filter(id => id !== allergyId)
                : [...prev.allergySelectList, allergyId];
            return { ...prev, allergySelectList: newAllergyList };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submitData = { ...formData };
            submitData.price = Number(submitData.price);
            submitData.pqty = Number(submitData.pqty);
            if (isNaN(submitData.price) || isNaN(submitData.pqty)) {
                alert('가격과 수량은 숫자여야 합니다.');
                return;
            }

            await editProduct(pno, submitData);
            navigate('/product/search');
        } catch (error) {
            console.error('제품 수정 실패:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h2 className="text-2xl font-bold mb-6 text-black">제품 수정</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <label className="block">
                        <span className="text-black font-bold">제품 이미지</span>
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

                {/* 카테고리 선택 */}
                <div>
                    <label className="block text-black mb-2 font-bold">카테고리</label>
                    <select
                        name="pcategory_ko"
                        value={formData.pcategory_ko}
                        onChange={handleInputChange}
                        className="w-full rounded-md border-[#F9BB00] text-black shadow-sm"
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
                        <h3 className="text-lg font-semibold mb-4 text-black">한국어 정보</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="ptitle_ko"
                                value={formData.ptitle_ko}
                                onChange={handleInputChange}
                                placeholder="제품명 (한국어)"
                                className="w-full p-2 border border-[#F9BB00] rounded"
                            />
                            <textarea
                                name="pcontent_ko"
                                value={formData.pcontent_ko}
                                onChange={handleInputChange}
                                placeholder="제품 설명 (한국어)"
                                className="w-full p-2 border border-[#F9BB00] rounded"
                                rows="3"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-black">영어 정보</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="ptitle_en"
                                value={formData.ptitle_en}
                                onChange={handleInputChange}
                                placeholder="Product Name (English)"
                                className="w-full p-2 border border-[#F9BB00] rounded"
                            />
                            <textarea
                                name="pcontent_en"
                                value={formData.pcontent_en}
                                onChange={handleInputChange}
                                placeholder="Product Description (English)"
                                className="w-full p-2 border border-[#F9BB00] rounded"
                                rows="3"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4 text-black">알레르기 정보</h3>
                    <div className="grid grid-cols-7 gap-2">
                        {ALLERGY_TYPES.map(allergy => (
                            <button
                                type="button"
                                key={allergy.id}
                                onClick={() => handleAllergyToggle(allergy.id)}
                                className={`p-2 rounded ${
                                    formData.allergySelectList.includes(allergy.id)
                                        ? 'bg-[#F9BB00] text-white'
                                        : 'bg-gray-300 text-gray-700'
                                }`}
                            >
                                {allergy.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-black font-bold">가격</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-[#F9BB00] shadow-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-black font-bold">수량</label>
                        <input
                            type="number"
                            name="pqty"
                            value={formData.pqty}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-[#F9BB00] shadow-sm"
                            required
                        />
                    </div>
                </div>

                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-[#F9BB00] text-white px-4 py-2 rounded-md shadow"
                    >
                        수정 완료
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductEditComponent;