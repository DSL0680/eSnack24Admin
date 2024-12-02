import React, { useState } from 'react';
import { useAppDispatch } from "../../rtk.js";
import { loginAdmin } from "../../api/adminapi/jwtAPI.js";
import { setAuth } from "../../slices/authSlice.js";
import { useNavigate } from "react-router-dom";

const AdminLoginComponent = () => {
    const [data, setData] = useState({ admid: '', admpw: '' });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        await loginAdmin(data).then((res) => {
            dispatch(
                setAuth({
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken,
                    admno: res.admno,
                })
            );
            navigate('/graph');
        });
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="flex-1 max-w-5xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    {/* Left Image Section */}
                    <div className="h-48 md:h-auto md:w-1/2 flex justify-center items-center">
                        <img
                            src="/eSnack24_logo_full.png"
                            alt="Logo Image"
                            className="w-48 md:w-64 h-auto object-contain mb-8 cursor-pointer"
                        />
                    </div>

                    {/* Login Form Section */}
                    <div className="flex items-center justify-center p-8 sm:p-16 md:w-1/2">
                        <div className="w-full">
                            <h1 className="mb-6 text-2xl font-semibold text-gray-700">
                                Admin Login
                            </h1>
                            <form>
                                {/* Admin ID Input */}
                                <label className="block text-sm">
                                    <span className="text-gray-700">Admin ID</span>
                                    <input
                                        className="block w-full mt-2 text-base border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                        type="text"
                                        name="admid"
                                        placeholder="Enter Admin ID"
                                        value={data.admid}
                                        onChange={onChange}
                                    />
                                </label>

                                {/* Password Input */}
                                <label className="block mt-6 text-sm">
                                    <span className="text-gray-700">Password</span>
                                    <input
                                        className="block w-full mt-2 text-base border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                        type="password"
                                        name="admpw"
                                        placeholder="Enter Password"
                                        value={data.admpw}
                                        onChange={onChange}
                                    />
                                </label>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 mt-6 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                                    onClick={handleClick}
                                >
                                    Log in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginComponent;