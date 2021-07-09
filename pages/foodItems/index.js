import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getFromStorage } from '../../utils/handleStorage';

export default function FoodItems() {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const res = await getFromStorage('foodItems');
      setFoodItems(res);
    };

    getItems();
  }, []);

  return (
    <>
      <Head>
        <title>Food Items</title>
      </Head>
      <h1 className="header">My Food Items</h1>
      {foodItems ? (
        <ul>
          {foodItems.map((item) => (
            <li key={item.id}>
              <Link href={`/foodItems/details/${item.id}`}>
                <a>{item.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      ) : <p>No food items added yet.</p>}
    </>
  );
}
