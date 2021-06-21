import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getFromStorage } from '../../../utils/handleStorage';
import MealPlanEditor from '../../../components/MealPlanEditor';
import MealPlan from '../../../classes/MealPlan';

export default function MealPlanDetails() {
  const router = useRouter();
  const itemId = router.query.id;
  const [mealPlans, setMealPlans] = useState([]);
  // const [currentMealPlan, setCurrentMealPlan] = useState();

  useEffect(() => {
    const getItems = async () => {
      const res = await getFromStorage('mealPlans');
      setMealPlans(res);
    };

    getItems();
  }, []);

  const plan = mealPlans.find((elem) => elem.id === itemId);
  const mealPlan = Object.assign(new MealPlan(), plan);
  // setCurrentMealPlan(mealPlan);

  return (
    <>
      <Head>
        <title>Meal Plan Details</title>
      </Head>

      {mealPlan ? (
        <>
          <h1>
            Meal Plan
            {/* {` ${mealPlan.name}`} */}
          </h1>
          <button type="button">
            <Link href={`/mealPlans/edit/${itemId}`}>
              <a>Edit Meal Plan</a>
            </Link>
          </button>

          <MealPlanEditor mealplan={mealPlan} />
        </>
      ) : <p>Loading...</p>}
    </>
  );
}
