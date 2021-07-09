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

  useEffect(() => {
    const getItems = async () => {
      const res = await getFromStorage('mealPlans');
      setMealPlans(res);
    };

    getItems();
  }, []);

  const plan = mealPlans.find((elem) => elem.id === itemId);
  const mealPlan = Object.assign(new MealPlan(), plan);

  return (
    <>
      <Head>
        <title>Meal Plan Details</title>
      </Head>

      {mealPlan ? (
        <>
          <h1>{mealPlan.name}</h1>
          <Link href={`/mealPlans/edit/${itemId}`}>
            <a>
              <button type="button" className="editButton">Edit Meal Plan &#128395;</button>
            </a>
          </Link>

          <MealPlanEditor mealplan={mealPlan} />
        </>
      ) : <p>Loading...</p>}
    </>
  );
}
