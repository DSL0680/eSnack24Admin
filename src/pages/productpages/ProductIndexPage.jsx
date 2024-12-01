import React from 'react';
import BasicLayout from "../../layout/BasicLayout.jsx";
import {Outlet} from "react-router-dom";

function ProductIndexPage() {
    return (
        <>
            <BasicLayout>
                <Outlet/>
            </BasicLayout>
        </>
    );
}

export default ProductIndexPage;