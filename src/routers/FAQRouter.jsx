
import {lazy, Suspense} from "react";



const FAQIndexPage = lazy(() => import("../pages/faqpages/FAQIndexPage.jsx"))
const FAQListPage = lazy(() => import("../pages/faqpages/FAQListPage.jsx"))
const FAQDetailPage = lazy(() => import("../pages/faqpages/FAQDetailPage.jsx"))
const FAQRegisterpage = lazy(() => import("../pages/faqpages/FAQRegisterpage.jsx"))
const LoadingComponent = lazy(() => import("../common/LoadingComponent.jsx"))


const Loading = <LoadingComponent/>


const FAQRouter = {


    path: "/faq",
    element: <FAQIndexPage/>,
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><FAQListPage/></Suspense>
        },
        {
            path: "detail/:fno",
            element: <Suspense fallback={Loading}><FAQDetailPage/></Suspense>
        },
        {
            path: "reg",
            element: <Suspense fallback={Loading}><FAQRegisterpage/></Suspense>
        }
    ]
}

export default FAQRouter;