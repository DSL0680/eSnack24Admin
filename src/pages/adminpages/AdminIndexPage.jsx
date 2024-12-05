import React from 'react';
import BasicLayout from "../../layout/BasicLayout.jsx";
import {Outlet} from "react-router-dom";

export const AdminTableHeader = [
    "ID", "이름", "권한", "등록시간", "수정시간"
]

export const AdminWorkTableHeader = [
    "ID", "이름", "권한", "답변 수"
]

export const AdminTableColumn = [
    "admno", "admid", "admname", "admrole", "admregdate", "admmoddate"
]

export const AdminWorkTableColumn = [
    "admno", "admid", "admname", "admrole", "count"
]

export const AdminAnswerTableHeader = [
    "제목", "등록시간", "수정시간"
]

export const AdminAnswerTableColumn = [
    "qno", "qtitle", "qregdate", "qmoddate"
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