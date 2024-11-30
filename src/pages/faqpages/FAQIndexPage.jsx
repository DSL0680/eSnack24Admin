import BasicLayout from "../../layout/BasicLayout.jsx";
import {Outlet} from "react-router-dom";

function FaqIndexPage() {
    return (
        <>
            <BasicLayout>
                <Outlet/>
            </BasicLayout>
        </>
    );
}

export default FaqIndexPage;