import { Link, Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

const Layout = () => {
  return (
    <div className="website">
      <nav className={styles.nav}>
        <div className="container">
          <div className="logo">
            <img src="" alt="TBA" />
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/docs">Docs</Link></li>
            <li><Link to="/demo">Demo</Link></li>
          </ul>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
