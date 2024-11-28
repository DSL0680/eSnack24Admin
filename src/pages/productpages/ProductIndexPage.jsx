import React from 'react';
import ProductListComponent from "../../components/productcomponents/ProductListComponent.jsx";
import BasicLayout from "../../layout/BasicLayout.jsx";

export const ProductListTableHeader = [
    "제품명", "수량", "가격", "등록시간", "수정시간"
]

export const ProductListTableColumn = [
    "pno", "ptitle_ko", "pqty", "price", "pregdate", "pmoddate"
]

function ProductIndexPage() {
    return (
        <BasicLayout>
            <ProductListComponent/>
        </BasicLayout>
    );
}

export default ProductIndexPage;