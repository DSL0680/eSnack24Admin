import LoadingComponent from "../common/LoadingComponent.jsx";
import {lazy, Suspense} from "react";

const Loading = <LoadingComponent/>

const AdminIndexPage = lazy(() => import("../pages/adminpages/AdminIndexPage"))
const AdminListPage = lazy(() => import("../pages/adminpages/AdminListPage.jsx"))
const AdminLoginPage = lazy(() => import("../pages/adminpages/AdminLoginPage"))
const AdminDetailPage = lazy(() => import("../pages/adminpages/AdminDetailPage"))
const AdminRegisterPage = lazy(() => import("../pages/adminpages/AdminRegisterPage.jsx"))

const AdminRouter = {

    path: '/admin',
    element: <AdminIndexPage />,
    children: [
        {path: 'list', element: <Suspense fallback={Loading}><AdminListPage/></Suspense> },
        {path: 'login', element: <Suspense fallback={Loading}><AdminLoginPage/></Suspense> },
        {path: 'detail/:admno', element: <Suspense fallback={Loading}><AdminDetailPage/></Suspense> },
        {path: 'reg', element: <Suspense fallback={Loading}><AdminRegisterPage/></Suspense> }
    ]

}

export default AdminRouter;