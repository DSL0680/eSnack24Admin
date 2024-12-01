import ProductAllergyListComponent from "../../components/productcomponents/ProductAllergyListComponent.jsx";

export const ProductAllergyListTableHeader = [
    "제품명", "알레르기 정보", "등록시간", "수정시간"
];

export const ProductAllergyListTableColumn = [
    "pno", "ptitle_ko", "allergyInfo", "pregdate", "pmoddate"
];

function ProductAllergyListPage() {
    return (
        <div>
            <ProductAllergyListComponent/>
        </div>
    );
}

export default ProductAllergyListPage;