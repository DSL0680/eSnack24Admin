import LoadingComponent from "../common/LoadingComponent.jsx";
import {lazy, Suspense} from "react";
import RequestProductIndexPage from "../pages/communitypages/product/RequestProductIndexPage.jsx";

const RequestProductList = lazy(() => import("../pages/communitypages/product/RequestProductListPage.jsx"));
const RequestProductDetail = lazy(() => import("../pages/communitypages/product/RequestProductDetailPage.jsx"));


const Loading = <LoadingComponent/>

const CommunityProductRouter = {
    path: '/request/product',
    element: <Suspense fallback={Loading}><RequestProductIndexPage/></Suspense>,
    children:[
        {
            path: "list",
            element: <Suspense fallback={Loading}><RequestProductList/></Suspense>,
        },
        {
            path: "detail/:cpno",
            element: <Suspense fallback={Loading}><RequestProductDetail/></Suspense>

        }
    ]

}
export default CommunityProductRouter;