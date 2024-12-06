import React from 'react';
import {Outlet} from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout.jsx";

export const ExchangeRateListHeader = [
    "기본 통화", "목표 통화", "환율", "담당자", "수정 시간"
]

export const ExchangeRateListColumn = [
    "erno", "baseCurrency", "targetCurrency", "rate", "admname", "erupdate"
]

function ExchangeRateIndexPage() {

    return (
        <BasicLayout>
            <Outlet/>
        </BasicLayout>
    );
}

export default ExchangeRateIndexPage;