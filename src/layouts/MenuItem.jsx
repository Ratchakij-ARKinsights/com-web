import { Link } from "react-router-dom";

export default function MenuItem({ to, name, active }) {
  return (
    <Link to={to}>
      <div className={`px-4 rounded-md text-sm font-medium text-gray-300  ${active ? "text-2xl font-medium rounded-lg" : " hover:bg-gray-700 hover:text-white "}`}>
        {name}
      </div>
    </Link>
  );
}
