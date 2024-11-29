import CommonTableComponent from "../../../common/CommonTableComponent.jsx";
import {
    RequestProductTableColumn,
    RequestProductTableHeader
} from "../../../pages/communitypages/product/RequestProductIndexPage.jsx";
import {getRequestProductList} from "../../../api/communityapi/requestProductAPI.js";

function RequestProductListComponent() {
    return (
        <>
            <CommonTableComponent
                name={"request/product"}
                tableHeader={RequestProductTableHeader}
                column={RequestProductTableColumn}
                listFn={getRequestProductList}
            >
            </CommonTableComponent>
        </>
    );
}

export default RequestProductListComponent;