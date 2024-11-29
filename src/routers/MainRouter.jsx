import { createBrowserRouter } from "react-router-dom";
import IndexPage from "../pages/IndexPage.jsx";
import AdminRouter from "./AdminRouter.jsx";
import CSRouter from "./CSRouter.jsx";
import ProductRouter from "./ProductRouter.jsx";
import userRouter from "./UserRouter.jsx";
import CommunityProductRouter from "./CommunityProductRouter.jsx";
import CommunityAllergyRouter from "./CommunityAllergyRouter.jsx";

const MainRouter = createBrowserRouter([
        {
            path: '/',
            element: <IndexPage />
        },
        AdminRouter,
        CSRouter,
        ProductRouter,
        userRouter,
        CommunityProductRouter,
        CommunityAllergyRouter

    ]
    )

export default MainRouter;