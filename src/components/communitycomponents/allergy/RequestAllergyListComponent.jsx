import CommonTableComponent from "../../../common/CommonTableComponent.jsx";
import {
    RequestAllergyTableColumn,
    RequestAllergyTableHeader
} from "../../../pages/communitypages/allergy/RequestAllergyIndexPage.jsx";
import {getRequestAllergyList} from "../../../api/communityapi/requestAllergyAPI.js";

function RequestAllergyListComponent() {
    return (
        <>
            <CommonTableComponent
                name={"request/allergy"}
                tableHeader={RequestAllergyTableHeader}
                column={RequestAllergyTableColumn}
                listFn={getRequestAllergyList}
            ></CommonTableComponent>
        </>
    );
}

export default RequestAllergyListComponent;