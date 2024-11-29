import BasicLayout from "../../layout/BasicLayout.jsx";
import {Outlet} from "react-router-dom";

function QnaIndexPage() {



    return (

        <>
            <BasicLayout>
                <Outlet/>
            </BasicLayout>
        </>
    );
}

export default QnaIndexPage;