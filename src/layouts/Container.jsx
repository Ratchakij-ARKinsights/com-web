import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Container() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
