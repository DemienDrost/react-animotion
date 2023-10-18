import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="website">
      <nav>
        <div className="logo">
          <img src="" alt="TBA" />
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/docs">Docs</Link></li>
          <li><Link to="/demo">Demo</Link></li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
