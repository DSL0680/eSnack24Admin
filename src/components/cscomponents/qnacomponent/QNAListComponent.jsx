import CommonTableComponent from "../../../common/CommonTableComponent.jsx";
import React from "react";
import {QNAListTableColumn, QNAListTableHeader} from "../../../pages/cspages/QNAPage.jsx";
import {getQNAList} from "../../../api/csapi/qnaAPI.js";


function QNAListComponent() {
    return (
        <div>
            <>
                <CommonTableComponent
                    name={"qna"}
                    listFn={getQNAList}
                    tableHeader={QNAListTableHeader}
                    column={QNAListTableColumn}>
                </CommonTableComponent>
            </>
        </div>
    );
}

export default QNAListComponent;