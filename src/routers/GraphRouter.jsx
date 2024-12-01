import {Suspense} from "react";
import LoadingComponent from "../common/LoadingComponent.jsx";
import GraphPage from "../pages/graphpages/GraphPage.jsx";

const Loading = <LoadingComponent/>


const GraphRouter = {

    path: '/graph',
    element: <Suspense fallback={Loading}><GraphPage/></Suspense>
}
export default GraphRouter