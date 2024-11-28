import React, { useState } from 'react';
import {useAppDispatch, useAppSelector} from "../../rtk.js";
import { loginAdmin } from "../../api/adminapi/jwtAPI.js";
import {setTokens, setAdmno} from "../../slices/authSlice.js";
import {useNavigate} from "react-router-dom";
import {Cookies} from "react-cookie";

const AdminLoginComponent = () => {
    const [data, setData] = useState({ admid: '', admpw: '' });
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const cookies = new Cookies();




    const handleClick = async (e) => {

        e.preventDefault();

        await loginAdmin(data).then((res) => {

            dispatch(setTokens({ accessToken: res.accessToken, refreshToken: res.refreshToken }));
            cookies.set("accessToken", res.accessToken, {path: '/'});
            cookies.set("refreshToken", res.refreshToken, {path: '/'});

            dispatch(setAdmno({ admno: (Number)(res.admno)} ));
            cookies.set("admno", (Number)(res.admno),  {path: '/'})

            navigate('/admin/list')
        })
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-lg font-bold mb-4 text-center">Admin Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="admid" className="block text-sm font-medium text-gray-700">
                            Admin ID
                        </label>
                        <input
                            type="text"
                            name="admid"
                            value={data.admid}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Admin ID"
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="admpw" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="admpw"
                            value={data.admpw}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Password"
                            onChange={onChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        onClick={handleClick}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginComponent;