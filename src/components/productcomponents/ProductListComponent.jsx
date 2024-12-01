import React from 'react';
import CommonTableComponent from "../../common/CommonTableComponent.jsx";
import {getAllProducts} from "../../api/productapi/productAPI.js";
import {ProductListTableColumn, ProductListTableHeader} from "../../pages/productpages/ProductListPage.jsx";

function ProductListComponent() {
    return (
        <>
            <CommonTableComponent
                name={"product"}
                listFn={getAllProducts}
                tableHeader={ProductListTableHeader}
                column={ProductListTableColumn}>
            </CommonTableComponent>
        </>
    );
}

export default ProductListComponent;