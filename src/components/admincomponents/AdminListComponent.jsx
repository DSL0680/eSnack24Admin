import React, { useState } from 'react';
import CommonTableComponent from "../../common/CommonTableComponent.jsx";
import {getAllAdminList, getCSAdminList, getElseAdminList} from "../../api/adminapi/adminAPI.js";
import { AdminTableColumn, AdminTableHeader } from "../../pages/adminpages/AdminIndexPage.jsx";
import {useSearchParams} from "react-router-dom";

const roles = ["ELSE", "ALL", "CS"];

function AdminListComponent() {
    const [select, setSelect] = useState('ELSE');
    const [listFn, setListFn] = useState(() => getElseAdminList);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleFilterClick = (filter) => {

        setSelect(filter);
        setSearchParams({ page: 1 });

        if (filter === "ALL") {

            setListFn(() => getAllAdminList);
        }  else if(filter === "CS") {

            setListFn(() => getCSAdminList)
        }else if (filter === "ELSE") {

            setListFn(() => getElseAdminList);
        }

    };

    return (
        <>
            <div className="flex justify-center items-center mb-4 space-x-2">
                {roles.map((filter) => (
                    <button
                        key={filter}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-300 ${
                            select === filter
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                        onClick={() => handleFilterClick(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <CommonTableComponent
                name={"admin"}
                listFn={listFn}
                tableHeader={AdminTableHeader}
                column={AdminTableColumn}
            />
        </>
    );
}

export default AdminListComponent;