import axios from "./axios";

// การใช้ axios.post จะส่งข้อมูลที่คุณระบุไปยัง URL ที่กำหนดด้วยเมธอด HTTP POST และรับข้อมูลที่เซิร์ฟเวอร์ส่งกลับมาในรูปแบบของ response.data
export const login = (input) => axios.post("/auth/login", input);
export const register = (input) => axios.post("/auth/register", input);

// การใช้ axios.get จะส่งคำขอ HTTP GET ไปยัง URL ที่กำหนดและรับข้อมูลที่เซิร์ฟเวอร์ส่งกลับมาในรูปแบบของ response.data
// axios.get(url, [config]):
// [config] (ไม่บังคับ) คืออ็อบเจ็กต์ที่เกี่ยวข้องกับการกำหนดค่าของร้องขอ GET เช่น ส่งพารามิเตอร์, กำหนด headers, และอื่น ๆ.
export const fetchMe = () => axios.get("/auth/me");
