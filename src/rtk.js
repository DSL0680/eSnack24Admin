import {useDispatch, useSelector} from "react-redux";


export const useAppDispatch = () => useDispatch();


export const useAppSelector = useSelector;


export const refreshAccessToken = () => {
    return refreshAccessToken;
}
