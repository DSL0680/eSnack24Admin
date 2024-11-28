import React, { useEffect, useState } from 'react';
import { editAdmin, getAdminOne } from "../../api/adminapi/adminAPI.js";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import CommonModal from "../../common/CommonModal.jsx";

const init = {
    admid: '',
    admname: '',
    admrole: '',
    admregdate: '',
    admmoddate: ''
};

const roles = ["ALL", "CS"];

function AdminDetailComponent() {
    const [formData, setFormData] = useState(init);
    const [updateData, setUpdateData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

    const { admno } = useParams();
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setUpdateData({
            ...updateData,
            [name]: value
        });
    };

    const handleRoleChange = (role) => {
        setFormData({
            ...formData,
            admrole: role
        });
        setUpdateData({
            ...updateData,
            admrole: role
        });
    };

    const handleUpdateClick = (e) => {
        e.preventDefault();
        setModalOpen(true);
    };

    const handleBackClick = () => {
        if (page) navigate(`/admin/list?page=${page}`);
        else navigate('/admin/list');
    };

    const updateFn = () => {
        editAdmin(admno, updateData).then((res) => {

            console.log(res);
        });
    };

    useEffect(() => {
        getAdminOne(admno).then((res) => {
            setFormData(res);
        });
    }, [admno]);

    return (
        <>
            {modalOpen && (
                <CommonModal
                    isOpen={modalOpen}
                    msg={"수정"}
                    fn={updateFn}
                    closeModal={() => setModalOpen(false)}
                />
            )}

            <div className="max-w-lg mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">관리자 정보 수정</h2>

                {/* ID */}
                <div>
                    <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
                    <input
                        type="text"
                        id="id"
                        name="admid"
                        value={formData.admid}
                        onChange={handleChange}
                        required
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        name="admpw"
                        value={formData.admpw}
                        onChange={handleChange}
                        required
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름</label>
                    <input
                        type="text"
                        id="name"
                        name="admname"
                        value={formData.admname}
                        onChange={handleChange}
                        required
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Roles */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">역할</label>
                    <div className="flex space-x-4 mt-2">
                        {roles.map((role) => (
                            <button
                                key={role}
                                type="button"
                                onClick={() => handleRoleChange(role)}
                                className={`px-4 py-2 rounded-md text-sm font-medium border focus:outline-none transition-colors ${
                                    formData.admrole === role
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-500 hover:text-white"
                                }`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Registration Date */}
                <div>
                    <label htmlFor="admregdate" className="block text-sm font-medium text-gray-700">등록일</label>
                    <input
                        type="text"
                        id="admregdate"
                        name="admregdate"
                        value={formData.admregdate}
                        disabled
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none bg-gray-100 text-gray-700"
                    />
                </div>

                {/* Modification Date */}
                <div>
                    <label htmlFor="admmoddate" className="block text-sm font-medium text-gray-700">수정일</label>
                    <input
                        type="text"
                        id="admmoddate"
                        name="admmoddate"
                        value={formData.admmoddate}
                        disabled
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none bg-gray-100 text-gray-700"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        className="w-5/12 bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        onClick={handleBackClick}
                    >
                        목록
                    </button>
                    <button
                        type="button"
                        className="w-5/12 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={handleUpdateClick}
                    >
                        수정
                    </button>
                </div>
            </div>
        </>
    );
}

export default AdminDetailComponent;