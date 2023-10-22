import axios from "axios";
import { getAccessToken } from "../utils/localstorage";

// 1. กำหนด baseURL ในรูปแบบนี้เมื่อนำเข้า Axios (import env for VITE)
axios.defaults.baseURL = "https://192.168.60.4:8444/";
// axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// 2. สร้างฟังก์ชันสำหรับการเพิ่ม Token ใน Header
const addTokenToHeader = (config) => {
  const token = getAccessToken(); //ดึง Token การรับรองตัวตนออกมาจาก localStorage.
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // หากมี Token จะเพิ่มค่า Authorization header ในคำขอ HTTP ด้วยค่า 'Bearer ' และ Token ที่ได้.
  }
  return config;
};

// 3. ใช้ Interceptor ใน Axios (interceptors ช่วยให้สามารถแก้ไข หรือเพิ่มข้อมูลในคำขอก่อนที่จะส่งไปยังเซิร์ฟเวอร์ได้)
axios.interceptors.request.use(addTokenToHeader, (error) => {
  return Promise.reject(error);
});

// 4.
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error;
  }
);

export default axios;

////////////////////////////////////////////////////////////////////////////////////////////////
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// axios.interceptors.request.use( // การใช้ interceptors ช่วยให้สามารถแก้ไข หรือเพิ่มข้อมูลในคำขอก่อนที่จะส่งไปยังเซิร์ฟเวอร์ได้
//     config => {
//         const token = getAccessToken(); // ดึง Token การรับรองตัวตนออกมาจาก localStorage.
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`; // หากมี Token จะเพิ่มค่า Authorization header ในคำขอ HTTP ด้วยค่า 'Bearer ' และ Token ที่ได้.
//         }
//         return config;
//     },
//     err => Promise.reject(err) // ถ้าเกิดข้อผิดพลาดในการแก้ไขคำขอ โค้ดนี้จะส่งข้อผิดพลาดกลับ.
// );

// export default axios;
