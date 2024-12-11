import {useState} from 'react';
import CommonTableComponent from "../../common/CommonTableComponent.jsx";
import { AdminWorkTableColumn, AdminWorkTableHeader } from "../../pages/adminpages/AdminIndexPage.jsx";
import {getAdminWorkListAsc, getAdminWorkListDesc} from "../../api/adminapi/adminAPI.js";
import {useSearchParams} from "react-router-dom";

const orders = [
    "ASC", "DESC"
]

function AdminWorkListComponent() {
    const [select, setSelect] = useState('ASC');
    const [listFn, setListFn] = useState(() => getAdminWorkListAsc);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleFilterClick = (filter) => {

        setSelect(filter);
        setSearchParams({ page: 1 });

        if (filter === "ASC") {

            setListFn(() => getAdminWorkListAsc);
        }  else if(filter === "DESC") {

            setListFn(() => getAdminWorkListDesc)
        }

    };

    return (
        <>
            <div className="flex justify-center items-center mb-4 space-x-2">
                {orders.map((filter) => (
                    <button
                        key={filter}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-300 ${
                            select === filter
                                ? "bg-[#F9BB00] text-white"
                                : "bg-gray-200 text-gray-600 hover:bg-[#F9BB00] hover:text-white"
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
                tableHeader={AdminWorkTableHeader}
                column={AdminWorkTableColumn}
            />
        </>
    );
}

export default AdminWorkListComponent;