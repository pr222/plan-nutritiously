import Link from 'next/link';

const GetStarted = () => (
  <>
    <h1>To Get started</h1>
    <h2>Overview</h2>
    <p>
      When you have at least one meal plan with some food added in it,
      {' you can go choose the meal plan in the '}
      <Link href="/">
        <a>overview</a>
      </Link>
      {' and see all the automatically calculated data of your meal plan. '}
      If you also set goals you can see how well the meal plan meets those goals!
    </p>
    <h2>Food Items</h2>
    <p>
      {'Add new '}
      <Link href="/foodItems/new/create-food-item">
        <a>food items</a>
      </Link>
      {' with per-100-grams-information and cost per kilo to '}
      provide the base data for the automatic calculations.
    </p>
    <h2>Meal Plans</h2>
    <p>
      {'Start creating a '}
      <Link href="/mealPlans/new/create-meal-plan">
        <a>meal plan</a>
      </Link>
      {' and fill it with different amount of ingredients based on your food items.'}
    </p>
    <h3>Goals</h3>
    <p>
      {'Go to '}
      <Link href="/profile/edit-goals"><a>My Goals</a></Link>
      {' and fill out how many nutrients you want to reach.'}
    </p>
  </>
);

export default GetStarted;
