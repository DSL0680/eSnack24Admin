import React, { useEffect, useState } from "react";
import {answerQNA, getQNAOne} from "../../api/csapi/qnaAPI.js";
import { useParams } from "react-router-dom";
import CommonModal from "../../common/CommonModal.jsx";
import {useSelector} from "react-redux";

const init = {
    qno: 0,
    admname: '', // 담당자 이름
    ptitle_ko: '', // 상품명
    qanswer: '', // 답변
    qcontent: '', // 질문내용
    qregdate: null, // 생성날짜
    qmoddate: null, // 수정날짜
    qstatus: false, // 답변상태
    qtitle: '',    // 질문제목
    uemail: '', // 유저이메일
};

function QnaDetailComponent() {
    const { qno } = useParams();
    const [formData, setFormData] = useState(init);
    const [modalOpen, setModalOpen] = useState(false);

    const auth = useSelector(state => state.auth);

    const handleChange = (e) => {
        const {value} = e.target.value;
        setFormData({
            ...formData,
            qanswer: value
        })
    }

    const handleSubmit = () => {

        console.log(auth.qno);

        // answerQNA.then((result) => {
        //     console.log(result);
        //     setModalOpen(true);
        // });

    };

    useEffect(() => {
        getQNAOne(qno).then((res) => {
            setFormData(res);
        });
    }, [qno]);





    if (!formData) {
        return <div className="text-center text-gray-600">Loading...</div>;
    }

    return (
        <>
            {modalOpen && (
                <CommonModal
                    isOpen={modalOpen}
                    msg={"등록"}
                    fn={updateFn}
                    closeModal={() => setModalOpen(false)}
                />
            )}

        <div className="max-w-5xl mx-auto bg-gray-50 rounded-lg shadow-md p-8 space-y-10 mt-10">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h2 className="text-3xl font-bold text-gray-800">QNA 상세정보</h2>
                <button
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md shadow-sm transition duration-200"
                    onClick={() => history.back()}
                >
                    돌아가기
                </button>
            </div>

            {/* 정보 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 왼쪽 컬럼 */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">담당자 이름</label>
                        <input
                            type="text"
                            value={formData.admname}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm text-gray-800"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">질문 제목</label>
                        <input
                            type="text"
                            value={formData.qtitle}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm text-gray-800"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">작성자 이메일</label>
                        <input
                            type="text"
                            value={formData.uemail || "N/A"}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm text-gray-800"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">등록일</label>
                        <input
                            type="text"
                            value={formData.qregdate ? new Date(formData.qregdate).toLocaleDateString() : "N/A"}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm text-gray-800"
                        />
                    </div>
                </div>

                {/* 오른쪽 컬럼 */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">질문 내용</label>
                        <textarea
                            value={formData.qcontent}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm text-gray-800 h-32 resize-none"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">답변 내용</label>
                        <textarea
                            value={formData.qanswer}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm text-gray-800 h-32 resize-none"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">수정일</label>
                        <input
                            type="text"
                            value={formData.qmoddate ? new Date(formData.qmoddate).toLocaleDateString() : "N/A"}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm text-gray-800"
                        />
                    </div>
                </div>
            </div>

            {/* 버튼 섹션 */}
            <div className="flex justify-end space-x-4">
                <button
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out"
                    onClick={handleSubmit}
                >
                    수정하기
                </button>
                <button
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out"
                    onClick={() => console.log("삭제")}
                >
                    삭제하기
                </button>
            </div>
        </div>
        </>
    );
}

export default QnaDetailComponent;