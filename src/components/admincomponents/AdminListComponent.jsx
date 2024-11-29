import React, {useEffect, useState} from 'react';
import CommonTableComponent from "../../common/CommonTableComponent.jsx";
import {getAllAdminList, getRoleAdminList} from "../../api/adminapi/adminAPI.js";
import {AdminTableColumn, AdminTableHeader} from "../../pages/adminpages/AdminIndexPage.jsx";

const roles = ["ELSE", "ALL", "CS"];

function AdminListComponent() {

    const [select, setSelect] = useState('ELSE');

    const [listFn, setListFn] = useState(getAllAdminList);

    const handleFilterClick = (filter) => {

        setSelect(filter);

        if(filter === "ALL" || filter === "CS") {
            setListFn(getRoleAdminList(filter));
        } else if(filter === "ELSE") {
            setListFn(getAllAdminList());
        }
    };

    useEffect(() => {

        console.log(listFn);
    }, [select])

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
                listFn={() => listFn}
                tableHeader={AdminTableHeader}
                column={AdminTableColumn}
            >
            </CommonTableComponent>
        </>
    );
}

export default AdminListComponent;