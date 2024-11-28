import CommonTableComponent from "../../common/CommonTableComponent.jsx";
import {UserListTableColumn, UserListTableHeader} from "../../pages/userpages/UserIndexPage.jsx";
import {getAllUsers} from "../../api/userapi/userAPI.js";

function UserListComponent() {
    return (
        <>
            <CommonTableComponent
                name={"user"}
                tableHeader={UserListTableHeader}
                column={UserListTableColumn}
                listFn={getAllUsers}
            ></CommonTableComponent>
        </>
    );
}

export default UserListComponent;