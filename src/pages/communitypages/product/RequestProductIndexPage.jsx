import {Outlet} from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout.jsx";

export const RequestProductTableColumn = [
    "cpno", "cptitle" ,"cpproduct", "cpanswer", "cpregdate", "cpmoddate"
]

export const RequestProductTableHeader = [
    "제목", "신고내용", "답변", "등록일", "수정일"
]
function RequestProductIndexPage() {
    return (
        <div>
            <BasicLayout>
            <Outlet/>
            </BasicLayout>
        </div>
    );
}

export default RequestProductIndexPage;