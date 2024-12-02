import React from 'react';
import ProductSearchComponent from "../../components/productcomponents/ProductSearchComponent";

export const ProductSearchTableHeader = [
    "제품명", "카테고리", "가격", "수량", "등록시간", "수정시간"
];

export const ProductSearchTableColumn = [
    "pno", "ptitle_ko", "pcategory_ko", "price", "pqty", "pregdate", "pmoddate"
];

function ProductSearchPage() {
    return (
        <div>
            <ProductSearchComponent />
        </div>
    );
}

export default ProductSearchPage;