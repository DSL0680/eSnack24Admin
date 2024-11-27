import {setAdmno, setTokens} from "./slices/authSlice.js";
import {useAppDispatch, useSelector} from "./rtk.js";



export const DemoComponent = () => {
    const dispatch = useAppDispatch();

    const { accessToken, admno } = useSelector((state) => state.auth);

    const handleLogin = () => {
        // 로그인 성공 후 토큰과 관리자 번호 저장
        dispatch(setTokens({ accessToken: 'abc123', refreshToken: 'xyz456' }));
        dispatch(setAdmno(12345));
        console.log('---------------');


    };

    return <button onClick={handleLogin}>로그인</button>;
};