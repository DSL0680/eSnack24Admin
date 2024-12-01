import React from 'react';
import CommonTableComponent from "../../common/CommonTableComponent.jsx";
import {getProductAllergyList} from "../../api/productapi/productAPI.js";
import {ProductAllergyListTableColumn, ProductAllergyListTableHeader} from "../../pages/productpages/ProductAllergyListPage.jsx";

function ProductAllergyListComponent() {
    return (
        <>
            <CommonTableComponent
                name={"product"}
                listFn={getProductAllergyList}
                tableHeader={ProductAllergyListTableHeader}
                column={ProductAllergyListTableColumn}>
            </CommonTableComponent>
        </>
    );
}

export default ProductAllergyListComponent;