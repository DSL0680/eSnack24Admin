import jwtAxios from "../../util/jwtUtil.js";


const host = "http://localhost:8080/admin/api/v1/graph";

export const getUserAllergyCount = async () => {

    const res = await jwtAxios.get(`${host}/user/allergy`)

    console.log("allergy--------------")
    console.log(res.data)

    return res.data

}

export const getUserAgeCount = async () => {

    const res = await jwtAxios.get(`${host}/user/age`)

    console.log("age--------")
    console.log(res.data)

    return res.data
}

export const getUserCountryCount = async () => {

    const res = await jwtAxios.get(`${host}/user/country`)

    console.log("country--------------")
    console.log(res.data)

    return res.data
}