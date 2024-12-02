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
    const [searchResult, setSearchResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const result = await searchProductsByAllergy({
                keyword: keyword,
                allergySelectList: selectedAllergies.includes('none') ? [] : selectedAllergies,
                page: 1,
                size: 10
            });
            setSearchResult(result);
        } catch (error) {
            console.error('검색 요청 실패:', error.response || error);
        } finally {
            setLoading(false);
        }
    };

    const handleAllergyToggle = (allergyId) => {
        if (allergyId === 'none') {
            setSelectedAllergies(prev => prev.includes('none') ? [] : ['none']);
            return;
        }

        setSelectedAllergies(prev => {
            if (prev.includes('none')) {
                return [allergyId];
            }
            return prev.includes(allergyId)
                ? prev.filter(id => id !== allergyId)
                : [...prev, allergyId];
        });
    };

    const searchResultListFn = () => {
        return Promise.resolve(searchResult);
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

            {/* 검색 결과 */}
            {loading ? (
                <div className="text-center text-gray-600">검색 중...</div>
            ) : (
                searchResult && (
                    <div>
                        <p className="mb-4 text-gray-600">
                            총 {searchResult.totalCount}개의 제품이 검색되었습니다.
                        </p>
                        <CommonTableComponent
                            name="product"
                            listFn={searchResultListFn}
                            tableHeader={ProductAllergySearchTableHeader}
                            column={ProductAllergySearchTableColumn}
                        />
                    </div>
                )
            )}
        </div>
    );
}

export default ProductAllergySearchComponent;