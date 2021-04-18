import PropTypes from 'prop-types';
import Nav from './Nav';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => (
  <div className={styles.container}>
    <Nav />
    <main>{children}</main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
