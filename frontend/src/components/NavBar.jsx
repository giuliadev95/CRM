import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 h-[20px]">
      <Link to="/">Leads</Link>
      <Link to="/">Contacts</Link>
      <Link to="/">Companies</Link>
      <Link to="/">Docs</Link>
    </nav>
  );
}

export default Navbar;
