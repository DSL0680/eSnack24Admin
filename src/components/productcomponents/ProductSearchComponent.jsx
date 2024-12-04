import React, { useState } from 'react';
import { searchProducts } from '../../api/productapi/productAPI';
import CommonTableComponent from "../../common/CommonTableComponent";
import { ProductSearchTableColumn, ProductSearchTableHeader } from "../../pages/productpages/ProductSearchPage.jsx";

// 카테고리 목록
const PRODUCT_CATEGORIES = [
    "칩",
    "쿠키/크래커",
    "쥐포/안주스낵",
    "과자류",
    "초콜릿/캔디",
    "견과일/넛트류",
    "젤리/푸딩"
];

function ProductSearchComponent() {
    const [keyword, setKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (keyword.trim() === '' && !selectedCategory) return;
        setLoading(true);

        try {
            const result = await searchProducts({
                keyword: keyword,
                pcategory_ko: selectedCategory,
                page: 1,
                size: 10
            });
            setSearchResult(result);
        } catch (error) {
            console.error('검색 중 오류 발생', error);
        } finally {
            setLoading(false);
        }
    };

    const searchResultListFn = () => {
        return Promise.resolve(searchResult);
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
                {/* 전체 카테고리 버튼 */}
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

                {/* 개별 카테고리 버튼들 */}
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
                            tableHeader={ProductSearchTableHeader}
                            column={ProductSearchTableColumn}
                        />
                    </div>
                )
            )}
        </div>
    );
}

export default ProductSearchComponent;