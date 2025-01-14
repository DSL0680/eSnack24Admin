import {Outlet} from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout.jsx";

export const RequestAllergyTableColumn = [
    "cano", "catitle", "caallergy", "caanswer", "caregdate", "camoddate", "castatus"
]

export const RequestAllergyTableHeader = [
    "제목", "신고내용", "답변", "등록일", "수정일", "답변여부"
]


function RequestAllergyIndexPage() {
    return (
        <div>
            <BasicLayout>
            <Outlet/>
            </BasicLayout>
        </div>
    );
}

export default RequestAllergyIndexPage;