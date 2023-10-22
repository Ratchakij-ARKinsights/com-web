import { ArrowLeftIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import CreatePage from "../pages/CreatePage";
import ConfigPage from "../pages/ConfigPage";

const menus = [
  { title: "User", src: "User", page: "CreatePage" },
  { title: "Order", src: "Order", page: null },
  { title: "Commission", src: "Setting", page: "ConfigPage" },
  { title: "Dashboard", src: "Chart_fill" },
  { title: "Accounts", src: "User", gap: true },
  { title: "Inbox", src: "Chat" },
  { title: "Schedule", src: "Calendar" },
  { title: "Search", src: "Search" },
  { title: "Analytics", src: "Chart" },
  { title: "Files", src: "Folder", gap: true },
  { title: "Setting", src: "Setting" },
];

export default function AdminPage() {
  const [open, setOpen] = useState(true);
  const [showPage, setShowPage] = useState(""); // เพิ่ม state สำหรับเก็บ component ที่จะแสดง

  const handlePage = (menu) => {
    setShowPage(() => menu.page); // กำหนดค่า showPage เมื่อคลิก
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto px-10 py-2">
          <h1 className="text-3xl font-bold text-gray-900">Admin Page</h1>
        </div>
      </header>
      <div className="flex">
        <div className={`${open ? "w-60" : "w-20"} bg-blue-500 duration-300 h-screen p-5 pt-8 relative`}>
          <img
            src="../../public/img/icon/control.png"
            className={`absolute cursor-pointer rounded-full -right-1 w-7 ${!open && "rotate-180 -right-2"}`}
            onClick={() => setOpen(!open)}
          />

          <div
            className="flex gap-x-4 items-center cursor-pointer"
            onClick={() => {
              setShowPage(() => "CreatePage");
            }}
          >
            {/* <img src="../../public/img/icon/logo.png" alt="" className="cursor-pointer duration-500" /> */}
            <Square3Stack3DIcon className="w-6 h-6 duration-500" />
            <h1 className={`origin-left text-white font-medium text-xl duration-300 ${!open && "scale-0"}`}>
              Designer
            </h1>
          </div>
          <ul className="pt-6">
            {menus.map((menu, index) => (
              <li
                key={index}
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-gray-300 rounded-md 
                            ${menu.gap ? "mt-9" : "mt-2"} 
                            ${showPage === menu.page ? "bg-blue-300" : ""}
                          `}
                onClick={() => handlePage(menu)} // เรียก handlePage เมื่อคลิกเมนู
              >
                <img src={`../../public/img/icon/${menu.src}.png`} alt="" />
                <span className={`${!open && "hidden"} origin-left duration-200`}>{menu.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full text-2xl font-semibold flex-1 h-screen">
          <div className="w-7xl mx-auto py-6 sm:px-2 lg:px-4 scale-100">
            {showPage === "CreatePage" && <CreatePage />}
            {showPage === "ConfigPage" && <ConfigPage />}
          </div>
        </div>
      </div>
    </>
  );
}
