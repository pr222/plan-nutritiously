import PropTypes from 'prop-types';
import Link from 'next/link';
import SidebarNav from './Sidebar-nav';
import style from '../styles/Layout.module.css';

const Layout = ({ children }) => (
  <div className={style.container}>
    <div className={style.logo}>
      <h1>Plan</h1>
      <h2>Nutritiously</h2>
    </div>
    <SidebarNav className={style.leftSideBar} />
    <main>{children}</main>
    <footer className={style.footer}>
      <div>
        <Link href="/about/">
          <a>About</a>
        </Link>
      </div>
      <div>
        <Link href="/about/get-started">
          <a>Get Started</a>
        </Link>
      </div>
    </footer>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
