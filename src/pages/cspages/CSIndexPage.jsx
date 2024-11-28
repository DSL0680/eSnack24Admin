import React from 'react';
import {Outlet} from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout.jsx";

function CsIndexPage() {
    return (
        <div>
            <BasicLayout>
            <Outlet/>
            </BasicLayout>
        </div>
    );
}

export default CsIndexPage;