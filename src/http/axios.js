import axios from "axios";
//const SERVER_URL = "https://insta-0u51.onrender.com"
const SERVER_URL = "http://localhost:4000"


export const api = axios.create({
    withCredentials: true,
    baseURL: SERVER_URL,
});

api.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${localStorage.getItem("fb_token")}`;
    return req;
});

api.interceptors.response.use((res) => {
    console.log(222)
    return res.data;
});
