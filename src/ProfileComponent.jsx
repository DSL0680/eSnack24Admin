import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshAccessToken } from "./rtk";

export const ProfileComponent = () => {
    const { accessToken, refreshToken, admno } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!accessToken && refreshToken) {
            // accessToken이 없으면 refreshToken을 이용해 새로 받아오는 로직
            dispatch(refreshAccessToken(refreshToken));
        }

        console.log("Current Access Token:", accessToken);
    }, [accessToken, refreshToken, dispatch]);

    return (
        <div>
            <p>Access Token: {accessToken}</p>
            <p>Admin Number: {admno}</p>
        </div>
    );
};