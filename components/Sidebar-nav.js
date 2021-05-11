import Link from 'next/link';
import style from '../styles/Sidebar-nav.module.css';

const SidebarNav = () => (
  <nav className={style.nav}>
    <ul className={style.mainUl}>
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
      <li>
        <Link href="/food-items">
          <a>My food items</a>
        </Link>
      </li>
      <ul className={style.subList}>
        <li className={style.subList}>
          <Link href="/add-food-item">
            <a>Add</a>
          </Link>
        </li>
      </ul>
    </ul>
  </nav>
);

export async function getStaticProps() {
  return { props: {} };
}

export default SidebarNav;
