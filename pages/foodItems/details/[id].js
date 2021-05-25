import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import localForage from 'localforage';

export default function FoodItemDetails() {
  const router = useRouter();
  const itemId = router.query.id;
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const res = await localForage.getItem('foodItems');
      setFoodItems(res);
    };

    getItems();
  }, []);

  const foodItem = foodItems.find((it) => it.id === Number(itemId));

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Food Item Details</title>
      </Head>

      {foodItem ? (
        <>
          <h1>{foodItem.name}</h1>
          <h2>Details</h2>
          <ul>
            <li>
              Kcal:
              {` ${foodItem.nutrition.kcal}`}
            </li>
            <li>
              Fats:
              {` ${foodItem.nutrition.fats}`}
            </li>
            <li>
              Carbohydrates:
              {` ${foodItem.nutrition.carbohydrates}`}
            </li>
            <li>
              Proteins:
              {` ${foodItem.nutrition.proteins}`}
            </li>
            <li>
              Cost:
              {` ${foodItem.cost.low}`}
            </li>
          </ul>
        </>
      ) : <p>Loading...</p>}
      {/* {foodItems.find((item) => (
        item.id === id
      ))} */}
      <button type="button">
        <Link href={`/foodItems/edit/${itemId}`}>
          <a>Edit</a>
        </Link>
      </button>
      <button type="button" onClick={goBack}>Back</button>
    </>
  );
}
