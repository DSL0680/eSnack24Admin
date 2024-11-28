import {useAppDispatch, useAppSelector} from "../../../rtk.js";
import {clearAuth, setTokens} from "../../../slices/authSlice.js";
import {Cookies} from "react-cookie";

const cookies = new Cookies();

const loadCookie = () => {

    const adminCookie = cookies.get("admin", {path:"/"});

    //console.log("memberCookie" + memberCookie)

    return adminCookie
}


const useLogin = () => {

    const dispatch = useAppDispatch()
    let admin = useAppSelector(state => state.login)

    if(!admin.admno){
        admin = loadCookie()
    }


    const doLogin = (param) => {
        dispatch(setTokens(param))
            .unwrap()
            .then( data => {
                console.log("unwrap")
                console.log(data)
                cookies.set("admin", data, {path:"/"})
            })
    }

    const doLogout = () => {
        dispatch(clearAuth)
        cookies.remove("admin", {path:"/"})
    }

    return {admin, doLogin, doLogout}
}


export default useLogin