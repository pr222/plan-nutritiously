import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getFromStorage } from '../../utils/handleStorage';

export default function MealPlans() {
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const res = await getFromStorage('mealPlans');
      setMealPlans(res);
    };

    getItems();
  }, []);

  return (
    <>
      <Head>
        <title>Meal Plans</title>
      </Head>
      <h1 className="header">My Meal Plans</h1>
      {mealPlans ? (
        <ul>
          {mealPlans.map((item) => (
            <li key={item.id}>
              <Link href={`/mealPlans/details/${item.id}`}>
                <a>{item.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      ) : <p>No Meal Plans added yet.</p>}
    </>
  );
}
