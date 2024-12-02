import FAQListComponent from "../../components/faqcomponent/FAQListComponent.jsx";


export const FAQListTableHeader = [
    "제목", "카테고리", "담당자",
]

export const FAQListTableColumn = [
    "fno", "ftitle", "fcategory", "admname"
]


function FaqListPage() {
    return (
        <div>
            <FAQListComponent/>
        </div>
    );
}

export default FaqListPage;