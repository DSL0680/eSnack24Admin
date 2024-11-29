import { createBrowserRouter } from "react-router-dom";
import IndexPage from "../pages/IndexPage.jsx";
import AdminRouter from "./AdminRouter.jsx";
import ProductRouter from "./ProductRouter.jsx";
import userRouter from "./UserRouter.jsx";
import QNARouter from "./QNARouter.jsx";

const MainRouter = createBrowserRouter([
        {
            path: '/',
            element: <IndexPage />
        },
        AdminRouter,
        QNARouter,
        ProductRouter,
        userRouter

    ]
    )

export default MainRouter;