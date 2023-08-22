// การจัดการ AccessToken หรือ Token การรับรองตัวตนที่ถูกเก็บไว้ใน localStorage ของเบราว์เซอร์

// ค่าคงที่ ACCESS_TOKEN ถูกกำหนดเป็นสตริง 'accessToken' ซึ่งเป็นคีย์ (key) ที่ใช้ในการเข้าถึง Token การรับรองตัวตนใน localStorage. ค่านี้จะถูกใช้เป็น key เมื่อจะบันทึกหรือดึง Token ออกมา.
const ACCESS_TOKEN = 'accessToken'; 

// ใช้เพื่อเก็บค่า token ลงใน localStorage โดยใช้ key ACCESS_TOKEN. นั่นหมายความว่า Token การรับรองตัวตนจะถูกเก็บไว้ในเบราว์เซอร์ของผู้ใช้.
export const setAccessToken = token => localStorage.setItem(ACCESS_TOKEN, token);

// ใช้ในการดึง Token การรับรองตัวตนออกมาจาก localStorage. โดยใช้ key ACCESS_TOKEN.
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

//  ใช้ในการลบค่า Token การรับรองตัวตนที่ถูกเก็บไว้ใน localStorage โดยใช้ key ACCESS_TOKEN.
export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN); 
