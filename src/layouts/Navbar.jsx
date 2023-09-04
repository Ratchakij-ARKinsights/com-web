import { useLocation } from "react-router-dom";

import MenuItem from "./MenuItem";
import useAuth from "../hooks/useAuth";

const menus = [
  { id: 1, to: "/", name: "Dashboard" },
  { id: 2, to: "/agent", name: "Agent" },
  { id: 3, to: "/product", name: "Product" },
  { id: 4, to: "/config", name: "Config" },
  { id: 5, to: "/about", name: "About" },
  { id: 6, to: "/create", name: "Create" },
];

export default function Navbar() {

  const location = useLocation();
  const { logout } = useAuth();

  return (
    <>
      <nav className="flex items-center justify-center flex-wrap bg-gray-800 p-4">
        <div className="flex items-center justify-between w-11/12">
          {/* LOGO */}
          <div className="mr-10 flex items-center text-white">
            <span className="font-semibold text-xl ">ARK Insure Broker Co., Ltd.</span>
          </div>

          {/* MENU */}
          {/* <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
            </button>
          </div> */}

          {/* <div className="flex-grow flex items-center w-auto"> */}
          {/* LIST MENU */}
          <div className="text-base text-white lg:flex-grow">
            {menus.map((el) => (
              <MenuItem
                key={el.id}
                to={el.to}
                name={el.name}
                active={location.pathname === el.to}
              />
            ))}
          </div>
          {/* Sign out */}
          {/* <div className="flex justify-end items-center"> */}
          <button className="inline-block px-4 py-2 leading-none  text-white hover:text-teal-200 mt-4 lg:mt-0"
            onClick={logout}>
            Sign out
          </button>
          {/* </div> */}
          {/* </div> */}
        </div>
      </nav>
    </>
  );
}