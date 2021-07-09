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

  return (
    <>
      <Head>
        <title>Food Item Details</title>
      </Head>

      {foodItem ? (
        <>
          <h1 className="header">{foodItem.name}</h1>

          <Link href={`/foodItems/edit/${itemId}`}>
            <a>
              <button type="button" className="editButton">Edit Food Item &#128395;</button>
            </a>
          </Link>
          <h2>Nutrition per 100g</h2>
          <ul className="noDotList">
            <li>
              &#128293; Kcal:
              {` ${foodItem.kcal}`}
            </li>
            <li>
              &#129361; Fats:
              {` ${foodItem.fats}`}
            </li>
            <li>
              &#127834; Carbohydrates:
              {` ${foodItem.carbohydrates}`}
            </li>
            <li>
              &#127830; Proteins:
              {` ${foodItem.proteins}`}
            </li>
          </ul>
          <h2>Prices</h2>
          <ul className="noDotList">
            <li>
              &#128184;
              Cost per kg:
              {` ${foodItem.costPerKg}`}
            </li>
          </ul>

        </>
      ) : <p>Loading...</p>}
    </>
  );
}
