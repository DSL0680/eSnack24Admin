import LoadingComponent from "../common/LoadingComponent.jsx";
import {lazy, Suspense} from "react";
import RequestAllergyIndexPage from "../pages/communitypages/allergy/RequestAllergyIndexPage.jsx";


const RequestAllergyList = lazy(() => import("../pages/communitypages/allergy/RequestAllergyListPage.jsx"));
const RequestAllergyDetail = lazy(() => import("../pages/communitypages/allergy/RequestAllergyDetailPage.jsx"));

const Loading = <LoadingComponent/>

const CommunityAllergyRouter = {
    path: '/request/allergy',
    element: <Suspense fallback={Loading}><RequestAllergyIndexPage/></Suspense>,
    children:[
        {
            path: "list",
            element: <Suspense fallback={Loading}><RequestAllergyList/></Suspense>,
        },
        {
            path: "detail/:cano",
            element: <Suspense fallback={Loading}><RequestAllergyDetail/></Suspense>
        }
    ]
}
export default CommunityAllergyRouter;