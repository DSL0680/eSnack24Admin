import UserIndexPage from "../pages/userpages/UserIndexPage.jsx";
import LoadingComponent from "../common/LoadingComponent.jsx";
import {lazy, Suspense} from "react";

const Loading = <LoadingComponent/>

const UserList = lazy(() => import("../pages/userpages/UserListPage.jsx"));

const UserRouter = {

    path: '/user',
    element: <Suspense fallback={Loading}><UserIndexPage/></Suspense>,
    children:[
        {
            path: "list",
            element: <Suspense fallback={Loading}><UserList/></Suspense>
        }
    ]

}

export default UserRouter;