import Head from 'next/head';
import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
import { getFromStorage } from '../utils/handleStorage';
// import style from '../styles/Form.module.css';
// import mockFoodItems from '../mocks/mockFoodItems';
// import mockIngredients from '../mocks/mockIngredients';
// import Ingredient from '../classes/Ingredient';
// import FoodItem from '../classes/FoodItem';
// import MealPlan from '../classes/MealPlan';
// import PropTypes from 'prop-types';
// import connectToDatabase from '../middleware/mongodb';

// export default function Home({ isConnected }) {
export default function Home() {
  // const [foodItems, setFoodItems] = useState([]);
  const [goals, setGoals] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [currentMealPlan, setCurrentMealPlan] = useState();
  const [mealPlanQuery, setMealPlanQuery] = useState('');
  // const [isSelected, setIsSelected] = useState(false);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  useEffect(() => {
    // const getItems = async () => {
    //   const res = await localForage.getItem('foodItems');
    //   setFoodItems(res);
    // };

    const getGoals = async () => {
      const res = await getFromStorage('goals');
      setGoals(res);
    };

    const getMealPlans = async () => {
      const res = await getFromStorage('mealPlans');
      setMealPlans(res);
    };
    // if (typeof window !== 'undefined') {
    //   if (mealPlans[1]) {
    //     if (mealPlans[1].ingredients) {
    //       mealPlans[1].ingredients.push(...mockIngredients);
    //       console.log('YEA');
    //     }
    //   }
    // }
    // getItems();
    getGoals();
    getMealPlans();
  }, []);

  const handleSelectMealPlan = (event) => {
    if (!event.target.value) {
      // setIsSelected(false);
      setCurrentMealPlan();
    } else {
      // setIsSelected(true);
    }
    setMealPlanQuery(event.target.value);
  };

  useEffect(() => {
    if (mealPlanQuery.length > 0) {
      const currentPlan = mealPlans.find((elem) => elem.id === mealPlanQuery);

      setCurrentMealPlan(currentPlan);
    }
  }, [mealPlanQuery, mealPlans]);

  return (
    <>
      <Head>
        <title>Plan Nutritiously</title>
      </Head>
      {/* <h1>Welcome!</h1>
      <p>Plan your groceries nutritiously</p> */}

      <form>
        <label htmlFor="selectMealPlan">
          Choose a MealPlan to overview
          <select id="selectMealPlan" name="selectMealPlan" value={mealPlanQuery} onChange={handleSelectMealPlan}>
            <option key="defaultSelect" value="">Meal Plans</option>
            {mealPlans.map((elem) => (
              <option key={`option-${elem.id}`} value={elem.id}>{elem.name}</option>
            ))}
          </select>
        </label>
      </form>
      {/* {isSelected ? 'SELECTET' : 'NO-SELECT'} */}

      {currentMealPlan
        ? (
          <>
            <h3>
              {currentMealPlan.name}
            </h3>
            {/* <p>{currentMealPlan.id}</p> */}
            <h4>Ingredients</h4>
            <ul>
              {currentMealPlan.ingredients !== undefined
                && currentMealPlan.ingredients.map((elem) => (
                  <li key={`ingredient-${elem.id}`}>
                    {`${elem.amount} g of ${elem.name} `}
                  </li>
                ))}
            </ul>
          </>
        )
        : <p>No plan selected</p>}

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
