import React from 'react';
import CommonTableComponent from "../../common/CommonTableComponent.jsx";
import {
    ExchangeRateListColumn,
    ExchangeRateListHeader
} from "../../pages/exchangeratepages/ExchangeRateIndexPage.jsx";
import {listExchangeRate} from "../../api/exchangerateapi/exchangeRateAPI.js";
import {useNavigate} from "react-router-dom";

function ExchangeRateListComponent() {

    const navigate = useNavigate();

    const handleClickCreate = () => {
        navigate("/exchange-rate/create");
    }

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">환율 관리</h2>
                <button
                    onClick={handleClickCreate}
                    className="bg-[#F9BB00] text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-[#F9BB00] transition duration-200"
                >
                    환율 등록
                </button>
            </div>
            <CommonTableComponent
                name={"exchange-rate"}
                listFn={listExchangeRate}
                tableHeader={ExchangeRateListHeader}
                column={ExchangeRateListColumn}
            />
        </>
    );
}

export default ExchangeRateListComponent;