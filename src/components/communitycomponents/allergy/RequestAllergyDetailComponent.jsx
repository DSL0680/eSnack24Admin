import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDate } from "../../../common/CommonTableComponent.jsx";
import CommonModal from "../../../common/CommonModal.jsx";
import {
    deleteRequestAllergy,
    getDetailRequestAllergy,
    updateRequestAllergy
} from "../../../api/communityapi/requestAllergyAPI.js";

function RequestAllergyDetailComponent() {
    const param = useParams();
    const navigate = useNavigate();

    const [requestAllergyData, setRequestAllergyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [buttonFn, setButtonFn] = useState();

    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");

    const no = Number(param.cano);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDetailRequestAllergy(no);
                setRequestAllergyData(data);
            } catch (error) {
                console.error("데이터 로드 중 오류 발생:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [no]);

    const handleBackClick = () => {
        if (page) navigate(`/request/allergy/list?page=${page}`);
        else navigate('/request/allergy/list');
    };

    const modifyClick = () => {
        setModalOpen(true);
        setMsg("수정");
        setButtonFn(() => async () => {
            try {
                const updatedAnswer = await updateRequestAllergy(no, requestAllergyData.caanswer);
                setRequestAllergyData((prev) => ({
                    ...prev,
                    caanswer: updatedAnswer.caanswer,
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
        setButtonFn(() => () => deleteRequestAllergy(no));

    };

    const cancelFn = () => {
        setModalOpen(false);
    };


    if (loading) {
        return <p>로딩 중...</p>;
    }

    if (!requestAllergyData) {
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
                        <strong>리스트 번호:</strong> {requestAllergyData.cano}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>제목:</strong> {requestAllergyData.catitle}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>신고내용:</strong> {requestAllergyData.caallergy}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>답변:</strong>
                        <textarea
                            value={requestAllergyData.caanswer || ""}
                            onChange={(e) =>
                                setRequestAllergyData((prev) => ({
                                    ...prev,
                                    caanswer: e.target.value,
                                }))
                            }
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </p>

                    <p className="text-gray-700 mb-2">
                        <strong>등록일:</strong> {formatDate(requestAllergyData.caregdate)}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>수정일:</strong> {formatDate(requestAllergyData.camoddate)}
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

export default RequestAllergyDetailComponent;
