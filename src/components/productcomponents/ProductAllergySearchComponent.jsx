import React, { useState } from 'react';
import { searchProductsByAllergy } from '../../api/productapi/productAPI';
import CommonTableComponent from "../../common/CommonTableComponent";
import { ProductAllergySearchTableColumn, ProductAllergySearchTableHeader } from "../../pages/productpages/ProductAllergySearchPage.jsx";

const ALLERGY_TYPES = [
    { id: 1, name: "계란" }, { id: 2, name: "우유" }, { id: 3, name: "메밀" },
    { id: 4, name: "밀" }, { id: 5, name: "대두" }, { id: 6, name: "호두" },
    { id: 7, name: "땅콩" }, { id: 8, name: "잣" }, { id: 9, name: "복숭아" },
    { id: 10, name: "토마토" }, { id: 11, name: "돼지고기" }, { id: 12, name: "쇠고기" },
    { id: 13, name: "닭고기" }, { id: 14, name: "고등어" }, { id: 15, name: "새우" },
    { id: 16, name: "홍합" }, { id: 17, name: "전복" }, { id: 18, name: "굴" },
    { id: 19, name: "조개류" }, { id: 20, name: "게" }, { id: 21, name: "오징어" }
];

function ProductAllergySearchComponent() {
    const [keyword, setKeyword] = useState('');
    const [selectedAllergies, setSelectedAllergies] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const searchProductAllergyList = async (page) => {
        const result = await searchProductsByAllergy({
            ptitle_ko: keyword,
            allergySelectList: selectedAllergies.includes('none') ? [] : selectedAllergies,
            page: page,
            size: 10
        });

        // 총 건수 상태 업데이트
        setTotalCount(result.totalCount);

        return result;
    };

    const handleSearch = async () => {
        // 키워드나 알레르기 선택 시 검색 진행
        if (keyword.trim() !== '' || selectedAllergies.length > 0) {
            // 첫 페이지로 검색
            await searchProductAllergyList(1);
        }
    };

    const handleAllergyToggle = (allergyId) => {
        if (allergyId === 'none') {
            // 알레르기 유발성분 없음 선택 시 -1 값 전달
            setSelectedAllergies(prev => prev.includes(-1) ? [] : [-1]);
            return;
        }

        setSelectedAllergies(prev => {
            if (prev.includes(-1)) {
                return [allergyId];
            }
            return prev.includes(allergyId)
                ? prev.filter(id => id !== allergyId)
                : [...prev, allergyId];
        });
    };

    return (
        <div className="container mx-auto p-4">
            {/* 검색창 */}
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="제품명을 입력하세요"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-l-md"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                    onClick={handleSearch}
                    className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600"
                >
                    검색
                </button>
            </div>

            {/* 알레르기 버튼 */}
            <div className="mb-6">
                <div className="grid grid-cols-7 gap-2">
                    {ALLERGY_TYPES.map((allergy) => (
                        <button
                            key={allergy.id}
                            onClick={() => handleAllergyToggle(allergy.id)}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 
                    ${selectedAllergies.includes(allergy.id)
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                    ${selectedAllergies.includes('none') ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={selectedAllergies.includes('none')}
                        >
                            {allergy.name}
                        </button>
                    ))}
                    <button
                        onClick={() => handleAllergyToggle('none')}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 col-span-2
                ${selectedAllergies.includes('none')
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        알레르기 유발성분 없음
                    </button>
                </div>
            </div>

            {/* 총 건수 표시 추가 */}
            {totalCount > 0 && (
                <p className="mb-4 text-gray-600">
                    총 {totalCount}개의 제품이 검색되었습니다.
                </p>
            )}

            <CommonTableComponent
                name="product"
                listFn={searchProductAllergyList}
                tableHeader={ProductAllergySearchTableHeader}
                column={ProductAllergySearchTableColumn}
                emptyMessage="해당 조건에 맞는 검색 결과가 없습니다."
            />
        </div>
    );
}

export default ProductAllergySearchComponent;