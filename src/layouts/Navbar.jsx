import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import MenuItem from "./MenuItem";
import useAuth from "../hooks/useAuth";

const menus = [
  { id: 1, to: "/", name: "Dashboard" },
  { id: 2, to: "/agent", name: "Agent" },
  { id: 3, to: "/config", name: "Config" },
  { id: 4, to: "/report", name: "Reports" },
  { id: 5, to: "/about", name: "About" },
];

export default function Navbar() {
  const location = useLocation();
  const { logout } = useAuth();
  
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-10 max-w-full">
              <Link to={'/'} className="text-3xl font-bold text-green-500">ARK Insure Broker Co., Ltd.</Link>
              <div className="flex space-x-5 w-auto">
                {menus.map((el) => (
                  <MenuItem
                    key={el.id}
                    to={el.to}
                    name={el.name}
                    active={location.pathname === el.to}
                  />
                ))}
              </div>
            </div>
            <button className="px-4 py-2 rounded-md text-lg font-medium text-gray-300"
              onClick={logout}
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
