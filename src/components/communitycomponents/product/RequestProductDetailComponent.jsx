import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDate } from "../../../common/CommonTableComponent.jsx";
import {
    deleteRequestProduct,
    getDetailRequestProduct,
    updateRequestProduct,
} from "../../../api/communityapi/requestProductAPI.js";
import CommonModal from "../../../common/CommonModal.jsx";

function RequestProductDetailComponent() {
    const param = useParams();
    const navigate = useNavigate();

    const [requestProductData, setRequestProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [buttonFn, setButtonFn] = useState();

    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");

    const no = Number(param.cpno);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDetailRequestProduct(no);
                setRequestProductData(data);
            } catch (error) {
                console.error("데이터 로드 중 오류 발생:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [no]);

    const handleBackClick = () => {
        if (page) navigate(`/request/product/list?page=${page}`);
        else navigate('/request/product/list');
    };

    const modifyClick = () => {
        setModalOpen(true);
        setMsg("수정");
        setButtonFn(() => async () => {
            try {
                const updatedAnswer = await updateRequestProduct(no, requestProductData.cpanswer);
                setRequestProductData((prev) => ({
                    ...prev,
                    cpanswer: updatedAnswer.cpanswer,
                }));
                setModalOpen(false);
            } catch (error) {
                console.error("답변 수정 중 오류 발생:", error);
            }

        });
    };


    const removeClick = () => {
        setModalOpen(true);
        setMsg("삭제");
        setButtonFn(() => () => deleteRequestProduct(no));

    };

    const cancelFn = () => {
        setModalOpen(false);
    };


    if (loading) {
        return <p>로딩 중...</p>;
    }

    if (!requestProductData) {
        return <p>데이터를 찾을 수 없습니다.</p>;
    }

    return (
        <>
            {modalOpen && (
                <CommonModal
                    isOpen={modalOpen}
                    msg={msg}
                    fn={buttonFn}
                    cancelFn={cancelFn}
                    closeModal={() => setModalOpen(false)}
                />
            )}

            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">상세 정보</h1>
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <p className="text-gray-700 mb-2">
                        <strong>리스트 번호:</strong> {requestProductData.cpno}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>제목:</strong> {requestProductData.cptitle}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>신고내용:</strong> {requestProductData.cpproduct}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>답변:</strong>
                        <textarea
                            value={requestProductData.cpanswer || ""}
                            onChange={(e) =>
                                setRequestProductData((prev) => ({
                                    ...prev,
                                    cpanswer: e.target.value,
                                }))
                            }
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </p>

                    <p className="text-gray-700 mb-2">
                        <strong>등록일:</strong> {formatDate(requestProductData.cpregdate)}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>수정일:</strong> {formatDate(requestProductData.cpmoddate)}
                    </p>
                </div>
                <div className="flex justify-end space-x-4 mt-8">
                    <button
                        className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out"
                        onClick={modifyClick}
                    >
                        수정하기
                    </button>
                    <button
                        className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out"
                        onClick={removeClick}
                    >
                        삭제하기
                    </button>
                </div>

                <button
                    onClick={handleBackClick}
                    className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
                >
                    목록으로 돌아가기
                </button>
            </div>
        </>
    );
}

export default RequestProductDetailComponent;
