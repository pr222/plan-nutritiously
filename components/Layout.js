import PropTypes from 'prop-types';
import SidebarNav from './Sidebar-nav';
import style from '../styles/Layout.module.css';

const Layout = ({ children }) => (
  <div className={style.container}>
    <div className={style.logo}>
      <h1>Plan</h1>
      <h2>Nutritiously</h2>
    </div>
    <div className={style.box1} />
    <div className={style.box2} />
    <div className={style.box3} />
    <SidebarNav className={style.leftSideBar} />
    <main>{children}</main>
    <footer>
      <a href="mailto: pr222ja@student.lnu.se">Contact</a>
    </footer>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
