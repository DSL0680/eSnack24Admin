import {Outlet} from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout.jsx";

export const UserListTableColumn = [
    "uno", "username", "email", "callNumber", "birth", "allergyList"
]

export const UserListTableHeader = [
    "이름", "이메일", "전화번호", "생년월일", "알러지 정보"
]


function UserIndexPage() {
    return (
        <div>
            <BasicLayout>
            <Outlet/>
            </BasicLayout>
        </div>
    );
}

export default UserIndexPage;