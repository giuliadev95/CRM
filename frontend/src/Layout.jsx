import { Outlet, NavLink } from "react-router-dom";
import SideBar from "./components/SideBar/Sidebar";

export default function Layout() {
  return (
    <div>
      <aside>
        <SideBar/>  
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
