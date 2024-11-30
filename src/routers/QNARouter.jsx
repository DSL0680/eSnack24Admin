import {lazy, Suspense} from "react";



const QNAIndexPage = lazy(() => import("../pages/qnapages/QNAIndexPage.jsx"))
const QNAListPage = lazy(() => import("../pages/qnapages/QNAListPage.jsx"))
const QNADetailPage = lazy(() => import("../pages/qnapages/QNADetailPage.jsx"))
const LoadingComponent = lazy(() => import("../common/LoadingComponent.jsx"))

const Loading = <LoadingComponent/>

const QNARouter = {


    path: "/qna",
    element: <QNAIndexPage/>,
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><QNAListPage/></Suspense>
        },
        {
            path: "detail/:qno",
            element: <Suspense fallback={Loading}><QNADetailPage/></Suspense>
        }
    ]
}

export default QNARouter;