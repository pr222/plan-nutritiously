import Head from 'next/head';
import { useEffect, useState } from 'react';
import localForage from 'localforage';
// import FoodPer100g from '../classes/FoodPer100g';
// import mockFoodsPer100g from '../tests/mockFoodsPer100g';
// import FoodItem from '../classes/FoodItem';
// import PropTypes from 'prop-types';
// import connectToDatabase from '../middleware/mongodb';

// export default function Home({ isConnected }) {
export default function Home() {
  // const [foodItems, setFoodItems] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    // const getItems = async () => {
    //   const res = await localForage.getItem('foodItems');
    //   setFoodItems(res);
    // };

    const getGoals = async () => {
      const res = await localForage.getItem('goals');
      setGoals(res);
    };

    // getItems();
    getGoals();
  }, []);

  // const food = new FoodPer100g();
  // console.log(food);
  // const tomato = {
  //   name: 'Tomato',
  //   kcal: 12,
  //   fats: 0.2,
  //   carbohydrates: 3.9,
  //   proteins: 0.9,
  // };
  // food.setInformation(tomato);
  // console.log(food);

  // const item = new FoodItem(food, 40);
  // console.log(item);

  // const rice = {
  //   name: 'Rice',
  //   custom: true,
  //   kcal: 130,
  //   fats: 0.3,
  //   carbohydrates: 28,
  //   proteins: 2.7,
  // };

  // const food2 = new FoodPer100g(rice);
  // console.log(food2);

  // console.log(mockFoodsPer100g);

  return (
    <>
      <Head>
        <title>Plan Nutritiously</title>
      </Head>
      <h1>Welcome!</h1>
      <p>Plan your groceries nutritiously</p>
      {/* <h2>My Food Items</h2>
      {foodItems ? (
        <ul>
          {foodItems.map((item) => (
            <li key={item.id}>
              {item.name}
            </li>
          ))}
        </ul>
      ) : <p>No food items added yet.</p>} */}

      <h2>Current goals</h2>
      {goals ? (
        <>
          <div>
            Kcal:
            {' '}
            {goals.kcal}
            {' per day'}
          </div>
          <div>
            Fat:
            {' '}
            {goals.fats}
            {' g per day'}
          </div>
          <div>
            Carbs:
            {' '}
            {goals.carbohydrates}
            {' g per day'}
          </div>
          <div>
            Protein:
            {' '}
            {goals.proteins}
            {' g per day'}
          </div>
        </>
      ) : <p>You have not set any goals yet...</p>}

      {/* {isConnected ? (
        console.log('You are connected to MongoDB')
      ) : (
        console.log('You are NOT connected to MongoDB')
      )} */}
    </>
  );
}

// export async function getServerSideProps() {
//   const { client } = await connectToDatabase();

//   const isConnected = await client.isConnected();

//   return {
//     props: { isConnected },
//   };
// }

// Home.propTypes = {
//   isConnected: PropTypes.bool.isRequired,
// };
