import React from 'react';
import CommonTableComponent from "../../common/CommonTableComponent.jsx";
import {getAllAdminList} from "../../api/adminapi/adminAPI.js";
import {AdminTableColumn, AdminTableHeader} from "../../pages/adminpages/AdminIndexPage.jsx";
import {useSelector} from "../../rtk.js";

function AdminAllListComponent() {
    const { accessToken, refreshToken, admno } = useSelector((state) => state.auth);

    return (
        <>
            <div>{accessToken}</div>
            <div>{refreshToken}</div>
            <div>{admno}</div>
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