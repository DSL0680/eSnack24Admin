import CommonTableComponent from "../../../common/CommonTableComponent.jsx";
import {
    RequestAllergyTableColumn,
    RequestAllergyTableHeader
} from "../../../pages/communitypages/allergy/RequestAllergyIndexPage.jsx";
import {
    getFRequestAllergyList,
    getTRequestAllergyList
} from "../../../api/communityapi/requestAllergyAPI.js";
import {useState} from "react";
import {useSearchParams} from "react-router-dom";

const roles = ["답변대기", "답변완료"];

function RequestAllergyListComponent() {

    const [select, setSelect] = useState(null); // 초기 상태는 아무 필터도 선택되지 않음
    const [listFn, setListFn] = useState(() => getFRequestAllergyList);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleFilterClick = (filter) => {
        setSelect(filter);
        setSearchParams({ page: 1 });

        if (filter === "답변대기") {
            setListFn(() => getFRequestAllergyList);
        } else if (filter === "답변완료") {
            setListFn(() => getTRequestAllergyList);
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
                                ? filter === "답변대기"
                                    ? "bg-red-200 text-red-800 font-bold" // '답변대기' 선택 시 스타일
                                    : "bg-green-200 text-green-800 font-bold" // '답변완료' 선택 시 스타일
                                : "bg-gray-200 text-gray-600 hover:bg-gray-300" // 초기 및 비활성화 상태
                        }`}
                        onClick={() => handleFilterClick(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>
            <CommonTableComponent
                name={"request/allergy"}
                tableHeader={RequestAllergyTableHeader}
                column={RequestAllergyTableColumn}
                listFn={listFn}
            ></CommonTableComponent>
        </>
    );
}

export default RequestAllergyListComponent;