import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { addFAQ } from "../../api/csapi/faqAPI.js";
import CommonModal from "../../common/CommonModal.jsx";
import { useNavigate } from "react-router-dom";

const init = {
    admno: "",
    ftitle: "",
    fcategory: "",
    fcontent: ""
};

function FaqRegisterComponent() {
    const [updateData, setUpdateData] = useState(init);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const auth = useSelector((state) => state.auth);
    const admno = auth.admno;

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUpdateData((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const addFn = () => {
        addFAQ(updateData).then((data) => {
            console.log(data);
        });
    };

    const handleAddClick = (e) => {
        e.preventDefault();
        setModalOpen(true);
    };

    useEffect(() => {
        setUpdateData((prev) => ({
            ...prev,
            admno: admno
        }));
    }, [admno]);

    return (
        <>
            {modalOpen && (
                <CommonModal
                    isOpen={modalOpen}
                    msg={"등록"}
                    fn={addFn}
                    closeModal={() => {
                        setModalOpen(false);
                        navigate("/faq/list");
                    }}
                    cancelFn={() => setModalOpen(false)}
                />
            )}

            <div className="max-w-lg mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">FAQ 등록</h2>

                {/* 관리자 번호 */}
                <div className="mb-4">
                    <label htmlFor="admno" className="block text-sm font-medium text-gray-700">관리자 번호</label>
                    <input
                        type="text"
                        id="admno"
                        value={updateData.admno}
                        readOnly
                        className="mt-2 p-3 w-full border border-gray-300 bg-gray-100 rounded-md shadow-sm text-gray-800"
                    />
                </div>

                {/* 제목 */}
                <div className="mb-4">
                    <label htmlFor="ftitle" className="block text-sm font-medium text-gray-700">제목</label>
                    <input
                        type="text"
                        id="ftitle"
                        value={updateData.ftitle}
                        onChange={handleChange}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* 카테고리 */}
                <div className="mb-4">
                    <label htmlFor="fcategory" className="block text-sm font-medium text-gray-700">카테고리</label>
                    <select
                        id="fcategory"
                        value={updateData.fcategory}
                        onChange={handleChange}
                        className="mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">--카테고리 선택--</option>
                        <option value="Product">Product</option>
                        <option value="System">System</option>
                        <option value="Order">Order</option>
                        <option value="Payment">Payment</option>
                        <option value="Etc">Etc</option>
                    </select>
                </div>

                {/* 내용 */}
                <div className="mb-6">
                    <label htmlFor="fcontent" className="block text-sm font-medium text-gray-700">내용</label>
                    <textarea
                        id="fcontent"
                        value={updateData.fcontent}
                        onChange={handleChange}
                        rows="6"
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                </div>

                {/* 버튼들 */}
                <div className="flex justify-between">
                    <button
                        type="button"
                        className="w-5/12 bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        onClick={() => navigate("/faq/list")}
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        className="w-5/12 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={handleAddClick}
                    >
                        등록
                    </button>
                </div>
            </div>
        </>
    );
}

export default FaqRegisterComponent;