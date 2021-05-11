import Head from 'next/head';
import { useEffect, useState } from 'react';
import localForage from 'localforage';

export default function FoodItems() {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const res = await localForage.getItem('foodItems');
      setFoodItems(res);
    };

    // if (typeof window !== 'undefined') {
    getItems();
    // }
  }, []);

  return (
    <>
      <Head>
        <title>Food Items</title>
      </Head>
      <h1>My Food Items</h1>
      {foodItems ? (
        <ul>
          {foodItems.map((item) => (
            <li key={item.id}>
              {item.name}
            </li>
          ))}
        </ul>
      ) : <p>No food items added yet.</p>}
    </>
  );
}
