import ProductListComponent from "../../components/productcomponents/ProductListComponent.jsx";

export const ProductListTableHeader = [
    "제품명", "카테고리", "가격", "수량", "등록시간", "수정시간"
];

export const ProductListTableColumn = [
    "pno", "ptitle_ko", "pcategory_ko", "price", "pqty", "pregdate", "pmoddate"
];

function ProductListPage() {
    return (
        <div>
            <ProductListComponent/>
        </div>
    );
}

export default ProductListPage;