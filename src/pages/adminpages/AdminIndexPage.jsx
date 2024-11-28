import React from 'react';
import BasicLayout from "../../layout/BasicLayout.jsx";
import {Outlet} from "react-router-dom";

export const AdminTableHeader = [
    "ID", "이름", "권한", "등록시간", "수정시간"
]

export const AdminTableColumn = [
    "admno", "admid", "admname", "admrole", "admregdate", "admmoddate"
]

function AdminIndexPage() {
    return (
        <>
            <BasicLayout>
                <Outlet/>
            </BasicLayout>
        </>
    );
}

export default AdminIndexPage;