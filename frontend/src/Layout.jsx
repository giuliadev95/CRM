import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <aside>
        <nav>
          <NavLink to="/" className="navlink">Contatti</NavLink>
          <NavLink to="/companies" className="navlink">Aziende</NavLink>
          <NavLink to="/leads" className="navlink">Leads</NavLink>
          <NavLink to="/projects" className="navlink">Progetti</NavLink>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
