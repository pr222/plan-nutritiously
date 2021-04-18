import Link from 'next/link';
import navStyles from '../styles/Nav.module.css';

// const PATH = process.env.BASE_PATH
const Nav = () => (
  <nav className={navStyles.nav}>
    <ul>
      <li>
        <Link href="/">

          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/login">

          <a>Login</a>
        </Link>
      </li>
      <li>
        <Link href="/register">

          <a>Register</a>
        </Link>
      </li>
    </ul>
  </nav>
);

export async function getStaticProps() {
  return { props: {} };
}

export default Nav;
