import LoadingComponent from "../common/LoadingComponent.jsx";
import {lazy, Suspense} from "react";

const Loading = <LoadingComponent/>

const ExchangeIndexPage = lazy(() => import("../pages/exchangeratepages/ExchangeRateIndexPage.jsx"));
const ExchangeCreatePage = lazy(() => import("../pages/exchangeratepages/ExchangeRateCreatePage.jsx"));
const ExchangeListPage = lazy(() => import("../pages/exchangeratepages/ExchangeRateListPage.jsx"));
const ExchangeDetailPage = lazy(() => import("../pages/exchangeratepages/ExchangeRateDetailPage.jsx"));

const ExchangeRateRouter = {
    path: '/exchange-rate',
    element: <ExchangeIndexPage/>,
    children: [
        {
            path: 'list',
            element: <Suspense fallback={Loading}><ExchangeListPage/></Suspense>
        },
        {
            path: 'create',
            element: <Suspense fallback={Loading}><ExchangeCreatePage/></Suspense>
        },
        {
            path: 'detail/:erno',
            element: <Suspense fallback={Loading}><ExchangeDetailPage/></Suspense>
        }
    ]
}

export default ExchangeRateRouter;