import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerProduct } from '../../api/productapi/productAPI';

const PRODUCT_CATEGORIES = [
    "칩",
    "쿠키/크래커",
    "쥐포/안주스낵",
    "과자류",
    "초콜릿/캔디",
    "견과일/넛트류",
    "젤리/푸딩"
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

function ProductRegisterComponent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ptitle_ko: '',
        pcontent_ko: '',
        pcategory_ko: '',
        price: '',
        pqty: '',
        pfilename: '',
        allergySelectList: []
    });
    const [previewImage, setPreviewImage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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
        setFormData(prev => ({
            ...prev,
            allergySelectList: prev.allergySelectList.includes(allergyId)
                ? prev.allergySelectList.filter(id => id !== allergyId)
                : [...prev.allergySelectList, allergyId]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerProduct(formData);
            navigate('/product/list');
        } catch (error) {
            console.error('제품 등록 실패:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h2 className="text-2xl font-bold mb-6">제품 등록</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">제품 이미지</span>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="mt-1 block w-full"
                            required
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

                <div>
                    <label className="block">
                        <span className="text-gray-700">제품명</span>
                        <input
                            type="text"
                            name="ptitle_ko"
                            value={formData.ptitle_ko}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        />
                    </label>
                </div>

                <div>
                    <label className="block">
                        <span className="text-gray-700">제품 설명</span>
                        <textarea
                            name="pcontent_ko"
                            value={formData.pcontent_ko}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            rows="3"
                            required
                        />
                    </label>
                </div>

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

                <div>
                    <label className="block text-gray-700 mb-2">알레르기 정보</label>
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
                    <label className="block">
                        <span className="text-gray-700">가격</span>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">수량</span>
                        <input
                            type="number"
                            name="pqty"
                            value={formData.pqty}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        />
                    </label>
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
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        등록
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductRegisterComponent;