import LoadingComponent from "../common/LoadingComponent.jsx";
import { lazy, Suspense } from "react";

const Loading = <LoadingComponent/>

const ProductIndexPage = lazy(() => import("../pages/productpages/ProductIndexPage.jsx"));
const ProductListPage = lazy(() => import("../pages/productpages/ProductListPage.jsx"));
const ProductAllergyListPage = lazy(() => import("../pages/productpages/ProductAllergyListPage.jsx"));
const ProductDetailPage = lazy(() => import("../pages/productpages/ProductDetailPage.jsx"));
const ProductRegisterPage = lazy(() => import("../pages/productpages/ProductRegisterPage.jsx"));
const ProductEditPage = lazy(() => import("../pages/productpages/ProductEditPage.jsx"));
const ProductSearchPage = lazy(() => import("../pages/productpages/ProductSearchPage.jsx"));
const ProductAllergySearchPage = lazy(() => import("../pages/productpages/ProductAllergySearchPage.jsx"));

const ProductRouter = {
    path: '/product',
    element: <Suspense fallback={Loading}><ProductIndexPage /></Suspense>,
    children: [
        {
            path: 'list',
            element: <Suspense fallback={Loading}><ProductListPage /></Suspense>
        },
        {
            path: 'allergy-list',
            element: <Suspense fallback={Loading}><ProductAllergyListPage /></Suspense>
        },
        {
            path: 'detail/:pno',
            element: <Suspense fallback={Loading}><ProductDetailPage /></Suspense>
        },
        {
            path: 'add',
            element: <Suspense fallback={Loading}><ProductRegisterPage /></Suspense>
        },
        {
            path: 'edit/:pno',
            element: <Suspense fallback={Loading}><ProductEditPage /></Suspense>
        },
        {
            path: 'search',
            element: <Suspense fallback={Loading}><ProductSearchPage /></Suspense>
        },
        {
            path: 'allergy-search',
            element: <Suspense fallback={Loading}><ProductAllergySearchPage /></Suspense>
        }
    ]
}

export default ProductRouter;