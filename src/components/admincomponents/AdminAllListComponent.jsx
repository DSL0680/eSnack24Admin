import React from 'react';
import CommonTableComponent from "../../common/CommonTableComponent.jsx";
import {getAllAdminList} from "../../api/adminapi/adminAPI.js";
import {AdminTableColumn, AdminTableHeader} from "../../pages/adminpages/AdminIndexPage.jsx";

function AdminAllListComponent() {

    return (
        <>
            <CommonTableComponent
                name={"admin"}
                listFn={getAllAdminList}
                tableHeader={AdminTableHeader}
                column={AdminTableColumn}
            >
            </CommonTableComponent>
        </>
    );
}

export default AdminAllListComponent;