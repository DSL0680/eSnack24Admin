import React, { useEffect, useState } from "react";
import {getFAQEdit, getFAQOne, getFAQRemove} from "../../api/csapi/faqAPI.js";
import {useNavigate, useParams} from "react-router-dom";
import CommonModal from "../../common/CommonModal.jsx";

const init = {
    ftitle: "",
    fcategory: "",
    fcontent: "",
};

function FaqDetailComponent() {
    const { fno } = useParams();
    const [formData, setFormData] = useState(init);
    const [editmodalOpen , setEditModalOpen] = useState(false);
    const [removemodalOpen, setRemoveModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target; // id와 value 추출
        setFormData((prev) => ({
            ...prev,
            [id]: value, // 해당 id 필드 업데이트
        }));
    };

    const EditFn = () => {

        getFAQEdit(fno, formData).then((res) => {
            console.log(res);
        });
    }

    const DeleteFn = () => {

        getFAQRemove(fno).then((res) => {
            console.log(res);
        });
    }


    const handleEditClick = () => {

        setEditModalOpen(true)
    }

    const handleRemoveClick = () => {

        setRemoveModalOpen(true)
    }






    useEffect(() => {
        getFAQOne(fno).then((res) => {
            setFormData(res);
        });
    }, [fno]);


    return (

        <>
            {editmodalOpen && (
                <CommonModal
                    isOpen={editmodalOpen}
                    msg={"수정"}
                    fn={EditFn}
                    closeModal={() => {
                        setEditModalOpen(false)
                        navigate('/faq/list');
                    }}
                />
            )}

            {removemodalOpen && (
                <CommonModal
                    isOpen={removemodalOpen}
                    msg={"삭제"}
                    fn={DeleteFn}
                    closeModal={() => {
                        setRemoveModalOpen(false)
                        navigate('/faq/list');
                    }}
                />
            )}

            <div className="max-w-4xl mx-auto p-8 space-y-8 bg-gray-50 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">FAQ 상세보기</h2>

                {/* 제목 */}
                <div className="mb-6">
                    <label htmlFor="ftitle" className="block text-lg font-medium text-gray-700 mb-2">
                        제목
                    </label>
                    <input
                        id="ftitle"
                        type="text"
                        value={formData.ftitle}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                    />
                </div>

                {/* 관리자 이름과 카테고리 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* 관리자 이름 */}
                    <div>
                        <label htmlFor="admname" className="block text-lg font-medium text-gray-700 mb-2">
                            관리자 이름
                        </label>
                        <input
                            id="admname"
                            type="text"
                            value={formData.admname || ""}
                            readOnly
                            className="w-full px-4 py-3 text-gray-900 border rounded-lg bg-gray-200 focus:outline-none"
                        />
                    </div>

                    {/* 카테고리 */}
                    <div>
                        <label htmlFor="fcategory" className="block text-lg font-medium text-gray-700 mb-2">
                            카테고리
                        </label>
                        <select
                            id="fcategory"
                            value={formData.fcategory}
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
                </div>

                {/* 내용 */}
                <div>
                    <label htmlFor="fcontent" className="block text-lg font-medium text-gray-700 mb-2">
                        내용
                    </label>
                    <textarea
                        id="fcontent"
                        value={formData.fcontent}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 resize-none"
                    />
                </div>

                {/* 버튼들 */}
                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        onClick={handleEditClick}
                        className="px-6 py-3 text-white bg-[#F9BB00] hover:bg-[#F9BB00] rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#F9BB00] focus:ring-offset-2"
                    >
                        수정
                    </button>

                    <button
                        onClick={handleRemoveClick}
                        className="px-6 py-3 text-white bg-[#F57C00] hover:bg-[#F57C00] rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#F57C00] focus:ring-offset-2"
                    >
                        삭제
                    </button>
                </div>
            </div>
        </>
    );
}

export default FaqDetailComponent;