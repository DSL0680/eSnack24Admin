import QNAListComponent from "../../components/cscomponents/qnacomponent/QNAListComponent.jsx";

// private Long qno;
// private String qtitle;
// private String ptitle_ko; // product
// private String uemail; // user
// private String admname; // admin
// private Timestamp qregdate;
// private boolean qstatus;

// private Timestamp qmoddate;
// private boolean qdelete;

export const QNAListTableHeader = [
    "제목", "상품명", "문의자", "담당자", "등록시간" ,"답변여부"
]

export const QNAListTableColumn = [
    "qno", "qtitle", "ptitle_ko", "uemail", "admname", "gregdate", "gstatus"
]


function QnaPage() {
    return (
        <div>
            <div>QNA PAGE</div>
            <QNAListComponent/>
        </div>
    );
}

export default QnaPage;