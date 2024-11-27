import { useEffect, useState } from "react";
import PageComponent from "@/common/pageComponent.jsx";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

const init = {
    list: [],
    endPage: 0,
    next: false,
    pageRequest: [],
    total: 0,
    startPage: 0,
    prev: false
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 9);
    return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
};

function CommonTableComponent({ name, tableHeader, column, listFn, actionSelect, bridge }) {
    const [data, setData] = useState(init);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const pageQuery = searchParams.get("page") || "";

    const changePage = (pageNum) => {
        setPage(pageNum);
        setSearchParams({ page: pageNum });
        setRefresh(!refresh);
    };

    const linkClick = (num) => {

        if(bridge) {

            navigate({
                pathname: `/${name}/read/${bridge}/${num}`,
                search: location.search, // 현재 쿼리 스트링을 그대로 유지
            });
        }else {

            navigate({
                pathname: `/${name}/read/${num}`,
                search: location.search, // 현재 쿼리 스트링을 그대로 유지
            });
        }
    };

    useEffect(() => {
        listFn(pageQuery).then((res) => {
            setData(res);
            console.log(res);
        });
    }, [page, searchParams, refresh, listFn]);

    return (
        <div className="overflow-x-auto p-4">
            <table className="min-w-full leading-normal border border-gray-300 rounded-lg shadow-lg">
                <thead className="bg-gradient-to-r from-green-400 to-green-500 text-white">
                <tr className="text-sm font-semibold text-left uppercase tracking-wide">
                    {tableHeader.map((item) => (
                        <th key={item} className="px-5 py-3 text-center">{item}</th>
                    ))}
                </tr>
                </thead>

                <tbody className="bg-white">
                {data.list.map((item) => (
                    <tr key={item[column[0]]}
                        className="hover:bg-gray-100 border-b border-gray-200"
                        onClick={() => linkClick(item[column[0]])}>
                        {column.slice(1).map((temp) => (
                            <td key={temp} className="px-5 py-4 text-sm text-gray-600 text-center">
                                {temp === 'writer' ? (
                                    item.cgemail || item.ctemail
                                    ): temp === 'checkAnswer' ? (
                                    <span className={item[temp] ? "text-gray-600" : "text-red-500"}>
                                            {item[temp] ? "답변완료" : "답변대기"}
                                        </span>
                                ) : temp.endsWith('Date') ? formatDate(item[temp]) : item[temp]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>

                <tfoot>
                <tr>
                    <td colSpan={column.length + (actionSelect ? 1 : 0)}>
                        <div className="flex justify-center items-center py-4">
                            <PageComponent pageResponse={data} changePage={changePage} />
                        </div>
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default CommonTableComponent;
