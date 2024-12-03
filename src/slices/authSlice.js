// features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// 쿠키에서 초기 상태 불러오기
let savedAuth;
try {
    const authCookie = cookies.get('auth', { path: '/' });
    savedAuth = authCookie ? authCookie : null;
} catch (e) {

    console.error(e);
    savedAuth = null;
}

const initialState = {
    accessToken: savedAuth ? savedAuth.accessToken : null,
    refreshToken: savedAuth ? savedAuth.refreshToken : null,
    admno: savedAuth ? savedAuth.admno : 0,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.admno = action.payload.admno;

            const result = {
                admno: action.payload.admno,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            };
            cookies.set("auth", JSON.stringify(result), { path: '/' });

            console.log("==========================");
            console.log(cookies.get("auth", {path: '/'}));
        },
        clearAuth(state) {
            cookies.remove("auth", { path: '/' });
            return { ...initialState };
        },
    },
});

export const { clearAuth, setAuth } = authSlice.actions;

export default authSlice.reducer;
