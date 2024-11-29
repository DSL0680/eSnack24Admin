import { useEffect, useState } from "react";
import PageComponent from "/src/common/pageComponent.jsx";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

const init = {
    dtoList: [],
    totalPage: 0,
    nextPage: 0,
    next: false,
    pageRequestDTO: [],
    pageNumList: [],
    total: 0,
    prevPage: 0,
    prev: false,
    current: 0
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 9);
    return date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};

const getFormattedArray = (value) => {
    if (Array.isArray(value)) {
        return value.join(", ");
    }
    return value;
};

function CommonTableComponent({ name, tableHeader, column, listFn}) {
    const [data, setData] = useState(init);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();

    const changePage = (pageNum) => {
        setPage(pageNum);
        setSearchParams({ page: pageNum });
    };

    const linkClick = (num) => {
        navigate({
            pathname: `/${name}/detail/${num}`,
            search: location.search,
        });
    };

    useEffect(() => {
        const pageQuery = searchParams.get("page") || 1;
        setLoading(true);
        listFn(pageQuery).then((res) => {
            setData(res);
            setLoading(false);
        });
    }, [searchParams, listFn]);

    return (
        <div className="overflow-x-auto p-4">
            <table className="table-fixed w-full leading-normal border border-gray-300 rounded-lg shadow-lg">
                <thead className="bg-gradient-to-r from-green-400 to-green-500 text-white">
                <tr className="text-sm font-semibold text-left uppercase tracking-wide">
                    {tableHeader.map((item, index) => (
                        <th
                            key={item}
                            className="px-5 py-3 text-center"
                            style={{ width: `${100 / tableHeader.length}%` }} // 동적으로 열 너비 설정
                        >
                            {item}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="bg-white">
                {loading ? (
                    <tr>
                        <td
                            colSpan={tableHeader.length}
                            className="text-center py-4 text-gray-500"
                        >
                            Loading...
                        </td>
                    </tr>
                ) : (
                    data.dtoList.map((item) => (
                        <tr
                            key={item.id || item[column[0]]}
                            className="hover:bg-gray-100 border-b border-gray-200"
                            onClick={() => linkClick(item[column[0]])}
                        >
                            {column.slice(1).map((col) => (
                                <td
                                    key={col}
                                    className="px-5 py-4 text-sm text-gray-600 text-center truncate"
                                >
                                    {col.endsWith("date")
                                        ? formatDate(item[col])
                                        : item[col]}
                                </td>
                            ))}
                        </tr>
                    ))
                )}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={column.length}>
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