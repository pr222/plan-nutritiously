import Head from 'next/head';
import { useEffect, useState } from 'react';
import localForage from 'localforage';
// import { useContext } from 'react';
// import { FoodItemsContext } from '../contexts/FoodItemsContext';
// import PropTypes from 'prop-types';
// import connectToDatabase from '../middleware/mongodb';

// export default function Home({ isConnected }) {
export default function Home() {
  // let goals;

  // if (typeof window !== 'undefined') {
  //   const loadGoals = JSON.parse(window.localStorage.getItem('goals'));
  //   if (loadGoals !== null) {
  //     goals = loadGoals;
  //   } else {
  //     goals = '';
  //   }
  // } else {
  //   goals = '';
  // }

  const [foodItems, setFoodItems] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const res = await localForage.getItem('foodItems');
      setFoodItems(res);
    };

    const getGoals = async () => {
      const res = await localForage.getItem('goals');
      setGoals(res);
    };

    getItems();
    getGoals();
  }, []);

  return (
    <>
      <Head>
        <title>Plan Nutritiously</title>
      </Head>
      <h1>Welcome!</h1>
      <p>Plan your groceries nutritiously</p>

      <h1>My Food Items</h1>
      {foodItems ? (
        <ul>
          {foodItems.map((item) => (
            <li key={item.id}>
              {item.name}
            </li>
          ))}
        </ul>
      ) : <p>No food items added yet.</p>}

      <h1>Current goals</h1>
      {/* <div>
        Kcal:
        {' '}
        {goals.kcal}
        {' per day'}
      </div>
      <div>
        Fat:
        {' '}
        {goals.fat}
        {' g per day'}
      </div>
      <div>
        Carbs:
        {' '}
        {goals.carbs}
        {' g per day'}
      </div>
      <div>
        Protein:
        {' '}
        {goals.protein}
        {' g per day'}
      </div> */}
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

      {/* {val ? (
        <ul>
          {val.foodItems.map((item) => (
            <li key={item.id}>
              {item.name}
            </li>
          ))}
        </ul>
      ) : <p>No food items added yet.</p>} */}

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
