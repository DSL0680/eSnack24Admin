import CommonTableComponent from "../../common/CommonTableComponent.jsx";
import React from "react";
import {getFAQList} from "../../api/csapi/faqAPI.js";
import {FAQListTableColumn, FAQListTableHeader} from "../../pages/faqpages/FAQListPage.jsx";

function FAQListComponent() {
    return (

            <>
                <CommonTableComponent
                    name={"faq"}
                    listFn={getFAQList}
                    tableHeader={FAQListTableHeader}
                    column={FAQListTableColumn}>
                </CommonTableComponent>
            </>

    );
}

export default FAQListComponent;