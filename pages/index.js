import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getFromStorage } from '../utils/handleStorage';
import MealPlan from '../classes/MealPlan';
import GetStartedInfo from '../components/GetStartedInfo';
import style from '../styles/Overview.module.css';

export default function Home() {
  const [goals, setGoals] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [currentMealPlan, setCurrentMealPlan] = useState();
  const [mealPlanQuery, setMealPlanQuery] = useState('');

  useEffect(() => {
    const getGoals = async () => {
      const res = await getFromStorage('goals');
      setGoals(res);
    };

    const getMealPlans = async () => {
      const res = await getFromStorage('mealPlans');
      setMealPlans(res);
    };

    getGoals();
    getMealPlans();
  }, []);

  const handleSelectMealPlan = (event) => {
    if (!event.target.value) {
      setCurrentMealPlan();
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
          <div className={style.boxWrapper}>
            <div className={style.box1}>
              <form>
                <label htmlFor="selectMealPlan">
                  <div>Select a Meal Plan to overview</div>
                  <select id="selectMealPlan" name="selectMealPlan" value={mealPlanQuery} onChange={handleSelectMealPlan}>
                    <option key="defaultSelect" value="">Meal Plans</option>
                    {mealPlans.map((elem) => (
                      <option key={`option-${elem.id}`} value={elem.id}>{elem.name}</option>
                    ))}
                  </select>
                </label>
              </form>
            </div>

            {currentMealPlan
              && currentMealPlan.totalCost
              ? (
                <>
                  <div className={style.box2}>
                    <div className={style.totalCostHeader}>Total Cost</div>
                    <div>
                      &#128184;
                      {`${currentMealPlan.totalCost.toFixed(2)} :-`}
                    </div>
                  </div>
                </>
              ) : <></>}

          </div>

          {currentMealPlan
            ? (
              <>
                {currentMealPlan.totalNutrients
                  && (
                    <>
                      <div className={style.header}>
                        <h1>Nutrients</h1>
                      </div>
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
                      <div className={style.header}>
                        <h1>Ingredients</h1>
                      </div>
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
