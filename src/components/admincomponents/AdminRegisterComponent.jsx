import React, {useState} from 'react';
import CommonModal from "../../common/CommonModal.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {registerAdmin} from "../../api/adminapi/adminAPI.js";

const init = {
    admid: '',
    admpw: '',
    admnamd: '',
    admrole: ''
}

const roles = ["ALL", "CS"];

function AdminRegisterComponent() {

    const [data, setData] = useState(init);
    const [modalOpen, setModalOpen] = useState(false);

    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleRoleChange = (role) => {
        setData({
            ...data,
            admrole: role
        });
    };

    const handleBackClick = () => {
        if (page) navigate(`/admin/list?page=${page}`);
        else navigate('/admin/list');
    };

    const handleRegisterClick = (e) => {
        
        e.preventDefault();
        setModalOpen(true);
    };


    return (
        <>
            {modalOpen && (
                <CommonModal
                    isOpen={modalOpen}
                    msg={"등록"}
                    fn={() => registerAdmin(data)}
                    closeModal={() => {
                        setModalOpen(false)
                        navigate('/admin/list');
                    }}
                    cancelFn={() => setModalOpen(false)}
                />
            )}

            <div className="max-w-lg mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">관리자 등록</h2>

                {/* ID */}
                <div>
                    <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
                    <input
                        type="text"
                        id="id"
                        name="admid"
                        value={data.admid}
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
                        value={data.admpw}
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
                        value={data.admname}
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
                                    data.admrole === role
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-500 hover:text-white"
                                }`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        className="w-5/12 bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        onClick={handleBackClick}
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        className="w-5/12 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={handleRegisterClick}
                    >
                        등록
                    </button>
                </div>
            </div>
        </>
    );
}

export default AdminRegisterComponent;