import CSIndexPage from "../pages/cspages/CSIndexPage.jsx";
import {lazy} from "react";

const QNAPage = lazy(() => import("../pages/cspages/QNAPage.jsx"))
const FAQPage = lazy(() => import("../pages/cspages/FAQPage.jsx"))


const CSRouter = {

    path: "/cs",
    element: <CSIndexPage />,
    children: [
        {
            path: "qna",
            element: <QNAPage/>
        },
        {
            path: "faq",
            element: <FAQPage/>
        }
    ]

}

export default CSRouter