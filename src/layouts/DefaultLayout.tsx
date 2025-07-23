import AppBar from "../components/AppBar";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <div className="flex flex-col h-screen">
      <AppBar />
      <Outlet />
    </div>
  );
}
