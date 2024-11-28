import React, {useEffect, useState} from 'react';
import {editAdmin, getAdminOne} from "../../api/adminapi/adminAPI.js";
import {useSelector} from "react-redux";

const init = {
    admid: '',
    admname: '',
    admrole: '',
    admregdate: '',
    admmoddate: ''
}

const roles = [
    "ALL", "CS"
]

function AdminEditComponent() {
    // 상태 관리: 입력값을 저장하기 위한 상태
    const [formData, setFormData] = useState(init);
    const [refresh, setRefresh] = useState(false);

    const auth = useSelector((state) => state.auth);

    // 상태 변경 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // 폼 제출 처리 함수
    const handleClick = (e) => {
        e.preventDefault();

        // 예시: 제출 후 초기화
        setFormData({
            id: '',
            password: '',
            name: ''
        });
    };

    useEffect(() => {

        getAdminOne(auth.admno).then((res) => {

            console.log(res);
            setFormData(res);
            setRefresh(!refresh);
        })
    }, refresh)

    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">관리자 정보 수정</h2>

            {/* ID 입력 필드 */}
            <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    value={formData.admid}
                    onChange={handleChange}
                    required
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* 비밀번호 입력 필드 */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.admpw}
                    onChange={handleChange}
                    required
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* 이름 입력 필드 */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.admname}
                    onChange={handleChange}
                    required
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* 역할 선택 */}
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

            {/* 관리자 등록일 */}
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

            {/* 관리자 수정일 */}
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

            {/* 수정 완료 버튼 */}
            <div className="flex justify-center">
                <button
                    type="button"
                    className="w-full mt-4 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={handleClick}
                >
                    수정 완료
                </button>
            </div>
        </div>
    );
}

export default AdminEditComponent;