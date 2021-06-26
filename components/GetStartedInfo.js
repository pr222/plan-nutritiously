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
    <h3>Overview</h3>
    <p>
      When you have at least one meal plan with some food added in it,
      {' you can go choose the meal plan in the '}
      <Link href="/">
        <a>overview</a>
      </Link>
      {' and see all the automatically calculated data of your meal plan. '}
      If you did already set the goals you can also see how well the meal plan meets those goals!
    </p>
  </>
);

export default GetStarted;
