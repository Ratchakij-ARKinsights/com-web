import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ title, children, width = 27, open, onClose }) {
  // ใช้ useEffect เพื่อเปลี่ยนค่าของ document.body.style.overflow เมื่อ open เปลี่ยนค่า
  // เพื่อควบคุมการเลื่อนหน้าเว็บในขณะที่โมเดลเปิดหรือปิด
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // กำหนดให้ body ไม่สามารถสลับเลื่อนได้เมื่อโมเดลเปิด
    } else {
      document.body.style.overflow = ""; // กำหนดให้ body เลื่อนได้เมื่อโมเดลปิด
    }
  }, [open]);
  
  // ใช้ createPortal เพื่อแสดงโมเดลที่ต้องการ
  return createPortal(
    <>
      {open && ( // คำสั่ง open && (...) ใช้ในการตรวจสอบว่าโมเดลควรถูกแสดงหรือไม่ หาก open เป็น true จะแสดงโมเดล
        <>

          <div className="fixed inset-0 bg-white opacity-70 z-20"></div>
          <div className="fixed inset-0 z-30" onMouseUp={onClose}>  {/* กำหนดการปิดโมเดลเมื่อคลิกที่พื้นหลัง */}
            <div className="flex justify-center items-center min-h-full p-4">
              <div
                style={{ maxWidth: `${width}rem` }}
                className="bg-white rounded-lg w-full shadow-[0_0_15px_rgb(0_0_0_/0.2)] flex flex-col overflow-hidden max-h-[calc(100vh-2rem)]"
                onMouseUp={(e) => e.stopPropagation()} // กำหนดให้เมื่อคลิกภายในโมเดลไม่ทำให้โมเดลปิด
              >
                <div className="flex justify-between items-center p-4 border-b text-xl">
                  <div className="invisible">&#10005;</div>
                  <div className="font-bold">{title}</div>
                  <div
                    className="text-gray-500 font-semibold hover:text-gray-600"
                    role="button"
                    onClick={onClose} // กำหนดการปิดโมเดลเมื่อคลิกที่สัญลักษณ์ X
                  >
                    &#10005;
                  </div>
                </div>
                <div className="p-4 overflow-auto">{children}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>,
    document.getElementById("modal")
  );
}
