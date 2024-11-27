import { createRoot } from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux";
import {store} from "./store.js";
import {RouterProvider} from "react-router-dom";
import mainRouter from "./routers/MainRouter.jsx";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={mainRouter}></RouterProvider>
    </Provider>
)
