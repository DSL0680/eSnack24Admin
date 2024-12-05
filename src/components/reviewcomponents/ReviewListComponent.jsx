import React from "react";
import CommonTableComponent from "/src/common/CommonTableComponent.jsx";
import { getReviewList } from "../../api/productapi/reviewAPI.js";
import {ReviewListTablecolumn, ReviewListTableHeader} from "../../pages/reviewpages/ReviewListPage.jsx";

function ReviewListComponent() {
    return (
        <CommonTableComponent
            name="review"
            tableHeader={ReviewListTableHeader}
            column={ReviewListTablecolumn}
            listFn={getReviewList}
        />
    );
}

export default ReviewListComponent;