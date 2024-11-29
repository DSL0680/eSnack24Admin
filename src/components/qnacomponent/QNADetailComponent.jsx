import { useEffect, useState } from "react";
import { getQNAOne } from "../../api/csapi/qnaAPI.js";
import { useParams } from "react-router-dom";

const init = {
    qno: 0,
    admname: '',
    ptitle_ko: '',
    qanswer: '',
    qcontent: '',
    qregdate: null,
    qmoddate: null,
    qstatus: false, // 작성자 이메일
    qtitle: '',   // 작성자 이름
    uemail: '',
};


function QnaDetailComponent() {
    const { qno } = useParams();
    const [formData, setFormData] = useState(init);

    useEffect(() => {
        getQNAOne(qno).then((res) => {
            setFormData(res);
        });
    }, [qno]);



    if (!formData) {
        return <div className="text-center text-gray-600">Loading...</div>;
    }

    return (
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
                <div className="space-y-6" >
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">질문 제목</label>
                        <div className="p-4 border border-gray-300 bg-white rounded-md shadow-sm">
                            <p className="text-lg text-gray-800">{formData.qtitle}</p>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">작성자 정보</label>
                        <div className="p-4 border border-gray-300 bg-white rounded-md shadow-sm">
                            <p className="text-gray-700">
                                <strong>이메일:</strong> {formData.cgemail || "N/A"}
                            </p>
                            <p className="text-gray-700">
                                <strong>이름:</strong> {formData.cgname || "N/A"}
                            </p>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">등록일</label>
                        <div className="p-4 border border-gray-300 bg-white rounded-md shadow-sm">
                            <p className="text-lg text-gray-800">
                                {new Date(formData.regDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 오른쪽 컬럼 */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">질문 내용</label>
                        <div className="p-4 border border-gray-300 bg-white rounded-md shadow-sm h-32 overflow-auto">
                            <p className="text-gray-800">{formData.qcontent}</p>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">답변 내용</label>
                        <div className="p-4 border border-gray-300 bg-white rounded-md shadow-sm">
                            <textarea
                                className="w-full h-32 p-2 bg-gray-100 text-gray-800 rounded-md resize-none"
                                defaultValue={formData.qanswer || ""}
                            ></textarea>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">수정일</label>
                        <div className="p-4 border border-gray-300 bg-white rounded-md shadow-sm">
                            <p className="text-lg text-gray-800">
                                {new Date(formData.modDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 버튼 섹션 */}
            <div className="flex justify-end space-x-4">
                <button
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out"
                    onClick={() => console.log("수정")}
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
    );
}

export default QnaDetailComponent;