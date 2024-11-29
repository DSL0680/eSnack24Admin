import QNAIndexPage from "../pages/qnapages/QNAIndexPage.jsx";
import {Suspense} from "react";
import LoadingComponent from "../common/LoadingComponent.jsx";
import QNADetailPage from "../pages/qnapages/QNADetailPage.jsx";
import QNAListPage from "../pages/qnapages/QNAListPage.jsx";
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