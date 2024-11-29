import QNAListComponent from "../../components/qnacomponent/QNAListComponent.jsx";

export const QNAListTableHeader = [
    "제목", "상품명", "문의자", "담당자", "등록시간" ,"답변여부"
]

export const QNAListTableColumn = [
    "qno", "qtitle", "ptitle_ko", "uemail", "admname", "gregdate", "gstatus"
]

function QnaListPage() {



    return (
        <div>
            <QNAListComponent/>
        </div>
    );
}

export default QnaListPage;