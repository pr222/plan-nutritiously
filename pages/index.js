import Head from 'next/head';
// import Link from 'next/link';
import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
import { getFromStorage } from '../utils/handleStorage';
// import style from '../styles/Form.module.css';
// import layoutStyle from '../styles/Layout.module.css';
// import mockFoodItems from '../mocks/mockFoodItems';
// import mockIngredients from '../mocks/mockIngredients';
// import Ingredient from '../classes/Ingredient';
// import FoodItem from '../classes/FoodItem';
import MealPlan from '../classes/MealPlan';
import GetStartedInfo from '../components/GetStartedInfo';
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
      const asClass = Object.assign(new MealPlan(), currentPlan);

      setCurrentMealPlan(asClass);
    }
  }, [mealPlanQuery, mealPlans]);

  return (
    <>
      <Head>
        <title>Plan Nutritiously</title>
      </Head>

      {mealPlans
      && (
        <>
          {/* <div className="box1">
            <p>Hello box 1!</p>
          </div> */}

          <form>
            <label htmlFor="selectMealPlan">
              <div>Choose a Meal Plan to overview:</div>
              <select id="selectMealPlan" name="selectMealPlan" value={mealPlanQuery} onChange={handleSelectMealPlan}>
                <option key="defaultSelect" value="">Meal Plans</option>
                {mealPlans.map((elem) => (
                  <option key={`option-${elem.id}`} value={elem.id}>{elem.name}</option>
                ))}
              </select>
            </label>
          </form>

          {currentMealPlan
            ? (
              <>
                <h1>{currentMealPlan.name}</h1>
                {/* <p>{currentMealPlan.id}</p> */}
                <h2>Overview</h2>

                {currentMealPlan.totalCost
                  && (
                    <>
                      <h3>{`Cost: ${currentMealPlan.totalCost} :-`}</h3>
                      {/* <div>{`Total Cost: ${currentMealPlan.totalCost} :-`}</div> */}
                    </>
                  )}

                {currentMealPlan.totalNutrients
                  && (
                    <>
                      <h3>Total Nutrients</h3>
                      <ul>
                        <li>
                          {`Kcal: ${currentMealPlan.totalNutrients.kcal}`}
                          {(goals && goals.kcal)
                            && (
                              <p>
                                {`Your goal of ${goals.kcal} `}
                                {goals.kcal <= currentMealPlan.totalNutrients.kcal
                                  ? 'reached!' : 'is almost there...'}
                              </p>
                            )}
                        </li>
                        <li>
                          {`Fats: ${currentMealPlan.totalNutrients.fats}`}
                          {(goals && goals.fats)
                            && (
                              <p>
                                {`Your goal of ${goals.fats} `}
                                  {goals.fats <= currentMealPlan.totalNutrients.fats
                                    ? 'reached!' : 'is almost there...'}
                              </p>
                            )}
                        </li>
                        <li>
                          {`Carbs: ${currentMealPlan.totalNutrients.carbohydrates}`}
                          {(goals && goals.carbohydrates)
                            && (
                              <p>
                                {`Your goal of ${goals.carbohydrates} `}
                                {goals.carbohydrates <= currentMealPlan.totalNutrients.carbohydrates
                                  ? 'reached!' : 'is almost there...'}
                              </p>
                            )}
                        </li>
                        <li>
                          {`Proteins: ${currentMealPlan.totalNutrients.proteins}`}
                          {(goals && goals.proteins)
                            && (
                              <p>
                                {`Your goal of ${goals.proteins} `}
                                {goals.proteins <= currentMealPlan.totalNutrients.proteins
                                  ? 'reached!' : 'is almost there...'}
                              </p>
                            )}
                        </li>
                      </ul>
                    </>
                  )}

                {currentMealPlan.ingredients
                  && (
                    <>
                      <h3>Ingredients</h3>
                      <ul>
                        {currentMealPlan.ingredients.map((elem) => (
                          <li key={`ingredient-${elem.id}`}>
                            {`${elem.amount} g of ${elem.name} `}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
              </>
            )
            : <p>No meal plan is selected.</p>}
        </>
      )}

      {/* {isSelected ? 'SELECTET' : 'NO-SELECT'} */}
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

      {/* <h2>Current goals</h2>
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
      ) : <p>You have not set any goals yet...</p>} */}

      {/* {isConnected ? (
        console.log('You are connected to MongoDB')
      ) : (
        console.log('You are NOT connected to MongoDB')
      )} */}

      {(!goals && !mealPlans)
        && (
          <>
            <h1>Welcome</h1>
            <p>
              See the total amount of nutrients for your meal plans
              and compare the numbers with your own goals!
            </p>
            <GetStartedInfo />
          </>
        )}
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
