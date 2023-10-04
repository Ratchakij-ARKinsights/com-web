import axios from "./axios";

export const getAllOrder = () => axios.get("/order");
export const getTotalPriceByAgentId = () => axios.get("/order/total-price-by-agent");
export const getSumOrderByRange = (input) => axios.get("/order/sum-order-by-range", { params: input });
export const getOrderAgentByLeader = (input) => axios.get("/order/sum-order-by-leader", { params: input });
export const getOrderAgentByRange = (input) => axios.get("/order/get-order-agent-by-range", { params: input });
export const getOrderCancel = (input) => axios.get("/order/get-order-cancel", { params: input });

export const createOrder = (input) => axios.post("/order", input);
export const createCancelOrder = (input) => axios.post("/order/create-cancel-order", input);

export const updateOrder = (input) => axios.patch(`/order/update-order/${input.id}`, input);

export const deleteCancelOrder = (id) => axios.delete(`/order/delete-cancel-order/${id}`);

// การใช้ axios.post จะส่งข้อมูลที่คุณระบุไปยัง URL ที่กำหนดด้วยเมธอด HTTP POST และรับข้อมูลที่เซิร์ฟเวอร์ส่งกลับมาในรูปแบบของ response.data
// export const register = input => axios.post('/auth/register', input);
// export const login = input => axios.post('/auth/login', input);

// การใช้ axios.get จะส่งคำขอ HTTP GET ไปยัง URL ที่กำหนดและรับข้อมูลที่เซิร์ฟเวอร์ส่งกลับมาในรูปแบบของ response.data
// axios.get(url, [config]):
// [config] (ไม่บังคับ) คืออ็อบเจ็กต์ที่เกี่ยวข้องกับการกำหนดค่าของร้องขอ GET เช่น ส่งพารามิเตอร์, กำหนด headers, และอื่น ๆ.
// export const fetchMe = () => axios.get('/auth/me');
