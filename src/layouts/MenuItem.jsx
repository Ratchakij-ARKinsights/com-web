import { Link } from "react-router-dom";

export default function MenuItem({ to, name, active }) {
  return (
    <Link to={to}>
      <div className={`text-gray-800 hover:text-blue-400 duration-500 ${active ? "underline " : ""}`}>
        {name}
      </div>
    </Link>
    
  );
}
