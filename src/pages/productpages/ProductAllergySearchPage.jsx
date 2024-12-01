import React from 'react';
import ProductAllergySearchComponent from "../../components/productcomponents/ProductAllergySearchComponent";

export const ProductAllergySearchTableHeader = [
    "제품명", "알레르기 정보", "카테고리", "등록시간", "수정시간"
];

export const ProductAllergySearchTableColumn = [
    "pno", "ptitle_ko", "allergyInfo", "pcategory_ko", "pregdate", "pmoddate"
];

function ProductAllergySearchPage() {
    return (
        <div>
            <ProductAllergySearchComponent />
        </div>
    );
}

export default ProductAllergySearchPage;