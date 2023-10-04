import { Bars3BottomRightIcon, PresentationChartBarIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import MenuItem from "./MenuItem";

const links = [
  { id: 1, to: "/admin", name: "Admin" },
  { id: 2, to: "/", name: "Dashboard" },
  { id: 3, to: "/agent", name: "Agent" },
  { id: 4, to: "/product", name: "Product" },
  { id: 5, to: "/config", name: "Config" },
  { id: 6, to: "/create", name: "Create" },
];

export default function nav() {
  const location = useLocation();
  const { authenticatedUser, logout } = useAuth();
  const user = authenticatedUser;
  console.log(user);

  const [open, setOpen] = useState(false);

  const className = `md:flex md:items-center md:pb-0 absolute md:static md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
    open ? "z-50 top-14 pb-6 bg-white border-y-4 border-y-black" : "z-[-1] top-[-490px]"
  }`;

  return (
    <div className="shadow-md w-full top-0 left-0  bg-gray-50 ">
      <div className=" md:px-10 px-7 py-4 md:flex justify-between items-center">
        {/* LOGO */}
        <Link to="/">
          <div className="flex text-2xl cursor-pointer items-center gap-2">
            <PresentationChartBarIcon className="w-7 h-7 text-blue-600" />
            <span className="font-bold">ARK Insure Broker Co., Ltd.</span>
          </div>
        </Link>

        <div className="w-3/4 flex justify-between">
          {/* MENU ICON */}
          <div className="w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden" onClick={() => setOpen(!open)}>
            {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
          </div>

          {/* LINK-1 */}
          <ul className={className}>
            {links.map((link, index) => (
              <li key={index} className="font-semibold my-7 md:my-0 md:ml-8">
                <MenuItem key={link.id} to={link.to} name={link.name} active={location.pathname === link.to} />
              </li>
            ))}
            {open && (
              <button
                className="m-0 md:my-0 md:ml-8 xs:hidden whitespace-nowrap text-gray-800 hover:text-blue-400 "
                onClick={logout}
              >
                Sign out
              </button>
            )}
          </ul>

          {/* LINK-2 */}
          {/* <div className={className}>
          {links.map((link, index) => (
            <Link key={index} to={link.to} className="font-semibold my-7 md:my-0 md:ml-8">
              <div className={`text-gray-800 hover:text-blue-400 duration-500 ${location.pathname === link.to ? "underline " : ""}`}>
                {link.name}
              </div>
            </Link>
          ))}
          </div> */}

          {/* LOGOUT */}
          {!open && (
            <div className={className}>
              <button
                className="m-0 md:my-0 md:ml-8 xs:hidden whitespace-nowrap text-gray-800 hover:text-blue-400 "
                onClick={logout}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
