import Link from 'next/link';

const GetStarted = () => (
  <>
    <h2>To Get started</h2>
    <h3>Goals</h3>
    <p>
      {'Go to '}
      <Link href="/profile/edit-goals"><a>My Goals</a></Link>
      {' and fill out how many nutrients you want to reach.'}
    </p>
    <h3>Food Collection</h3>
    <p>
      {'Add new '}
      <Link href="/foodItems/new/create-food-item">
        <a>food items</a>
      </Link>
      {' with per-100-grams-information and cost per kilo to '}
      provide the base data for the automatic calculations.
    </p>
    <h3>Meal Plans</h3>
    <p>
      {'Start creating a '}
      <Link href="/mealPlans/new/create-meal-plan">
        <a>meal plan</a>
      </Link>
      {' to then fill it with desired ingredients from your collection.'}
    </p>
  </>
);

export default GetStarted;
