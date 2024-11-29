import CommonTableComponent from "../../common/CommonTableComponent.jsx";
import React from "react";
import {getQNAList} from "../../api/csapi/qnaAPI.js";
import {QNAListTableColumn, QNAListTableHeader} from "../../pages/qnapages/QNAListPage.jsx";


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