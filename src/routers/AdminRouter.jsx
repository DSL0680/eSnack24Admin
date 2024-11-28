import LoadingComponent from "../common/LoadingComponent.jsx";
import {lazy, Suspense} from "react";

const Loading = <LoadingComponent/>

const AdminIndexPage = lazy(() => import("../pages/adminpages/AdminIndexPage"))
const AdminAllListPage = lazy(() => import("../pages/adminpages/AdminAllListPage"))
const AdminLoginPage = lazy(() => import("../pages/adminpages/AdminLoginPage"))
const AdminEditPage = lazy(() => import("../pages/adminpages/AdminEditPage"))

const AdminRouter = {

    path: '/admin',
    element: <AdminIndexPage />,
    children: [
        {path: 'list', element: <Suspense fallback={Loading}><AdminAllListPage/></Suspense> },
        {path: 'login', element: <Suspense fallback={Loading}><AdminLoginPage/></Suspense> },
        {path: 'edit', element: <Suspense fallback={Loading}><AdminEditPage/></Suspense> },
    ]

}

export default AdminRouter;