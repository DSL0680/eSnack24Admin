import React, { useState } from 'react';
import { searchProducts } from '../../api/productapi/productAPI';
import CommonTableComponent from "../../common/CommonTableComponent";
import { ProductSearchTableColumn, ProductSearchTableHeader } from "../../pages/productpages/ProductSearchPage.jsx";

const PRODUCT_CATEGORIES = [
    "칩", "쿠키/크래커", "쥐포/안주스낵", "과자류",
    "초콜릿/캔디", "견과일/넛트류", "젤리/푸딩"
];

function ProductSearchComponent() {
    const [keyword, setKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [totalCount, setTotalCount] = useState(0);

    const searchProductList = async (page) => {
        const result = await searchProducts({
            ptitle_ko: keyword,
            pcategory_ko: selectedCategory,
            page: page,
            size: 10
        });

        // 총 건수 상태 업데이트
        setTotalCount(result.totalCount);

        return result;
    };

    const handleSearch = async () => {
        // 키워드나 카테고리가 있을 때만 검색 진행
        if (keyword.trim() !== '' || selectedCategory !== '') {
            // 첫 페이지로 검색
            await searchProductList(1);
        }
    };

    return (
        <div className="container mx-auto p-4">
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

            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    key="all"
                    onClick={() => {
                        setSelectedCategory('');
                        handleSearch();
                    }}
                    className={`px-3 py-1 rounded-md text-sm ${selectedCategory === ''
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-green-100'}`}
                >
                    전체
                </button>

                {PRODUCT_CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => {
                            setSelectedCategory(category);
                            handleSearch();
                        }}
                        className={`px-3 py-1 rounded-md text-sm ${selectedCategory === category
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-green-100'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* 총 건수 표시 추가 */}
            {totalCount > 0 && (
                <p className="mb-4 text-gray-600">
                    총 {totalCount}개의 제품이 검색되었습니다.
                </p>
            )}

            <CommonTableComponent
                name="product"
                listFn={searchProductList}
                tableHeader={ProductSearchTableHeader}
                column={ProductSearchTableColumn}
                emptyMessage="해당 조건에 맞는 검색 결과가 없습니다."
            />
        </div>
    );
}

export default ProductSearchComponent;