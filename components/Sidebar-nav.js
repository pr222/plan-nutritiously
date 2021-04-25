import Link from 'next/link';
import style from '../styles/Sidebar-nav.module.css';

const SidebarNav = () => (
  <nav className={style.nav}>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/edit-goals">
          <a>Edit Goals</a>
        </Link>
      </li>
    </ul>
  </nav>
);

export async function getStaticProps() {
  return { props: {} };
}

export default SidebarNav;
