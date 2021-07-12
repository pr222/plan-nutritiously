import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getFromStorage } from '../utils/handleStorage';
import MealPlan from '../classes/MealPlan';
import GetStartedInfo from '../components/GetStartedInfo';
import Diagram from '../components/Diagram';
import style from '../styles/Overview.module.css';
import 'react-circular-progressbar/dist/styles.css';

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
                      <div className={style.nutrientWrapper}>
                        <div>
                          <h2>Energy</h2>
                          <div className={style.diagramWrapper}>
                            <Diagram
                              goal={goals ? goals.kcal : ''}
                              nutrientValue={currentMealPlan.totalNutrients.kcal}
                              nutrientType="Kcal"
                              emoji="&#128293;"
                            />
                          </div>
                        </div>

                        <div>
                          <h2>Macro Nutrients</h2>
                          <div className={style.diagramWrapper}>
                            <Diagram
                              goal={goals ? goals.fats : ''}
                              nutrientValue={currentMealPlan.totalNutrients.fats}
                              nutrientType="Fat"
                              unit="g"
                              emoji="&#129361;"
                            />
                            <Diagram
                              goal={goals ? goals.carbohydrates : ''}
                              nutrientValue={currentMealPlan.totalNutrients.carbohydrates}
                              nutrientType="Carbs"
                              unit="g"
                              emoji="&#127834;"
                            />
                            <Diagram
                              goal={goals ? goals.proteins : ''}
                              nutrientValue={currentMealPlan.totalNutrients.proteins}
                              nutrientType="Protein"
                              unit="g"
                              emoji="&#127830;"
                            />
                          </div>
                        </div>
                      </div>
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

      {(goals && !mealPlans)
        && (
          <>
            <h1>No Meal Plans to overview yet!</h1>
            <p>Seems like you have added some goals for yourself, great! &#128516;</p>
            <p>Now you just need to create some Meal Plans to overview here.</p>
            <p>(And add some Food Items in case you haven´t done that already...)</p>
            <GetStartedInfo />
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
