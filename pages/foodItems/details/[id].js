import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import localForage from 'localforage';
import FoodPer100g from '../../../classes/FoodItem';

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

  const food = foodItems.find((it) => it.id === Number(itemId));
  const foodItem = Object.assign(new FoodPer100g(), food);

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
          <h2>Nutrition per 100g</h2>
          <ul>
            <li>
              Kcal:
              {` ${foodItem.kcal}`}
            </li>
            <li>
              Fats:
              {` ${foodItem.fats}`}
            </li>
            <li>
              Carbohydrates:
              {` ${foodItem.carbohydrates}`}
            </li>
            <li>
              Proteins:
              {` ${foodItem.proteins}`}
            </li>
          </ul>
          <h2>Prices</h2>
          {/* <ul>
            <li>
              Low cost per kg:
              {` ${foodItem.cost.low}`}
            </li>
          </ul> */}
          <button type="button" onClick={goBack}>Back</button>
          <button type="button">
            <Link href={`/foodItems/edit/${itemId}`}>
              <a>Edit Food Item</a>
            </Link>
          </button>
        </>
      ) : <p>Loading...</p>}
    </>
  );
}
