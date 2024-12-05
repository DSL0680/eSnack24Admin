import LoadingComponent from "../common/LoadingComponent.jsx";
import { lazy, Suspense } from "react";

const Loading = <LoadingComponent/>

const ReviewIndexPage = lazy(() => import("../pages/reviewpages/ReviewIndexPage.jsx"));
const ReviewListPage = lazy(() => import("../pages/reviewpages/ReviewListPage.jsx"));
const ReviewDetailPage = lazy(() => import("../pages/reviewpages/ReviewDetailPage.jsx"));

const ReviewRouter = {
    path: '/review',
    element: <Suspense fallback={Loading}><ReviewIndexPage /></Suspense>,
    children: [
        {
            path: 'list',
            element: <Suspense fallback={Loading}><ReviewListPage /></Suspense>
        },
        {
            path: 'detail/:rno',
            element: <Suspense fallback={Loading}><ReviewDetailPage /></Suspense>
        }
    ]
}

export default ReviewRouter;