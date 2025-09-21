import { Outlet } from "react-router-dom";
import SideBar from "./components/Global/SideBar/Sidebar";

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
