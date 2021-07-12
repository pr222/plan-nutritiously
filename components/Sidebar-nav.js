import Link from 'next/link';
import style from '../styles/Sidebar-nav.module.css';

const SidebarNav = () => (
  <nav className={style.nav}>
    <ul className={style.mainUl}>
      <li>
        <Link href="/">
          <a>&#128202; Overview</a>
        </Link>
      </li>
      <li>
        <Link href="/foodItems/">
          <a>&#127857; My Food Items</a>
        </Link>
        <ul className={style.subList}>
          <li>
            <Link href="/foodItems/new/create-food-item">
              <a>&#10133; New Food Item</a>
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <Link href="/mealPlans/">
          <a>&#128203; All Meal Plans</a>
        </Link>
        <ul className={style.subList}>
          <li>
            <Link href="/mealPlans/new/create-meal-plan">
              <a>&#10133; New Meal Plan</a>
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <Link href="/profile/edit-goals">
          <a>&#127942; My Goals</a>
        </Link>
      </li>
    </ul>
  </nav>
);

export async function getStaticProps() {
  return { props: {} };
}

export default SidebarNav;
