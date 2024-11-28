import LoadingComponent from "../common/LoadingComponent.jsx";
import {lazy, Suspense} from "react";

const Loading = <LoadingComponent/>

const AdminIndexPage = lazy(() => import("../pages/adminpages/AdminIndexPage"))
const AdminAllListPage = lazy(() => import("../pages/adminpages/AdminAllListPage"))
const AdminLoginPage = lazy(() => import("../pages/adminpages/AdminLoginPage"))
const AdminDetailPage = lazy(() => import("../pages/adminpages/AdminDetailPage.jsx"))

const AdminRouter = {

    path: '/admin',
    element: <AdminIndexPage />,
    children: [
        {path: 'list', element: <Suspense fallback={Loading}><AdminAllListPage/></Suspense> },
        {path: 'login', element: <Suspense fallback={Loading}><AdminLoginPage/></Suspense> },
        {path: 'detail/:admno', element: <Suspense fallback={Loading}><AdminDetailPage/></Suspense> },
    ]

}

export default AdminRouter;