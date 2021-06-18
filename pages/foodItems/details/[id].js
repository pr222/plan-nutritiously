import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getFromStorage } from '../../../utils/handleStorage';
import FoodItem from '../../../classes/FoodItem';

export default function FoodItemDetails() {
  const router = useRouter();
  const itemId = router.query.id;
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const res = await getFromStorage('foodItems');
      setFoodItems(res);
    };

    getItems();
  }, []);

  const food = foodItems.find((elem) => elem.id === itemId);
  const foodItem = Object.assign(new FoodItem(), food);

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Food Item Details</title>
      </Head>

      <button type="button" onClick={goBack}>Back</button>

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
          <ul>
            <li>
              Cost per kg:
              {` ${foodItem.costPerKg}`}
            </li>
          </ul>
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
