import Link from 'next/link';
import style from '../styles/Sidebar-nav.module.css';

const SidebarNav = () => (
  <nav className={style.nav}>
    <ul className={style.mainUl}>
      <li>
        <Link href="/">
          <a>Dashboard</a>
        </Link>
      </li>
      <li>
        Profile
      </li>
      <ul className={style.subList}>
        <li>
          <Link href="/profile/edit-goals">
            <a>My Goals</a>
          </Link>
        </li>
      </ul>
      <li>
        My Meal Plans
      </li>
      <ul className={style.subList}>
        <li>
          <Link href="/mealPlans/">
            <a>All Meal Plans</a>
          </Link>
        </li>
        <li>
          <Link href="/mealPlans/new/create-meal-plan">
            <a>New Meal Plan</a>
          </Link>
        </li>
      </ul>
      <li>
        My Food Collection
      </li>
      <ul className={style.subList}>
        <li>
          <Link href="/foodItems/">
            <a>All Food Items</a>
          </Link>
        </li>
        <li>
          <Link href="/foodItems/new/create-food-item">
            <a>New Food Item</a>
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
