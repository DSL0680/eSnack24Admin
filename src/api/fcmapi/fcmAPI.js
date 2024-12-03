import jwtAxios from "../../util/jwtUtil.js";

export const host  = 'http://localhost:8080/api/fcm';

export const savetoken = async (fcm) => {

    const res = await jwtAxios.post(`${host}/savetoken`, fcm );

    console.log("------")
    console.log(res.data);

    return res.data;
}