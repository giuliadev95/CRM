import { Outlet, NavLink } from "react-router-dom";
import SideBar from "./components/SideBar/Sidebar";

export default function Layout() {
  return (
    <div>
      <aside>
        <SideBar/>
        {/*
          <div className="md:hidden">X</div>
        */}
        <nav className="hidden md:inline-block">
          <NavLink to="/" className="navlink">Contatti</NavLink>
          <NavLink to="/companies" className="navlink">Aziende</NavLink>
          <NavLink to="/projects" className="navlink">Progetti</NavLink>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
