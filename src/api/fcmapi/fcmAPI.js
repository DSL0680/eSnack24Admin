import jwtAxios from "../../util/jwtUtil.js";

const host = `${import.meta.env.VITE_API_HOST}/fcm`;

export const savetoken = async (fcm) => {

    const res = await jwtAxios.post(`${host}/savetoken`, fcm );

    console.log("------")
    console.log(res.data);

    return res.data;
}