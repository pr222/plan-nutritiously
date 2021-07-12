/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { deleteItemInArray, getFromStorage, updateItemInArray } from '../../../utils/handleStorage';
import style from '../../../styles/Form.module.css';
import FoodItem from '../../../classes/FoodItem';

export default function EditFoodItem() {
  const [isSaved, setIsSaved] = useState(false);

  const router = useRouter();
  const itemId = router.query.id;
  const [currentItem, setCurrentItem] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const prefillForm = async () => {
      const res = await getFromStorage('foodItems');

      if (res !== null) {
        const foodItem = res.find((elem) => elem.id === itemId);

        if (foodItem) {
          const food = Object.assign(new FoodItem(), foodItem);

          setCurrentItem(food);

          reset({
            name: food.name,
            kcal: food.kcal,
            fats: food.fats,
            carbohydrates: food.carbohydrates,
            proteins: food.proteins,
            costPerKg: food.costPerKg,
          });
        }
      }
    };

    prefillForm();
  }, [reset, itemId]);

  const submitEditedFoodItem = async (data) => {
    setIsSaved(false);
    const res = await getFromStorage('foodItems');

    if (res !== null) {
      const foodItem = res.find((elem) => elem.id === itemId);

      if (foodItem) {
        const food = Object.assign(new FoodItem(), foodItem);

        food.name = data.name;
        food.kcal = data.kcal;
        food.fats = data.fats;
        food.carbohydrates = data.carbohydrates;
        food.proteins = data.proteins;
        food.costPerKg = data.costPerKg;

        await updateItemInArray('foodItems', food);

        setIsSaved(true);
      }
    }
  };

  const handleDeleteSubmit = async () => {
    await deleteItemInArray('foodItems', currentItem);

    router.push('/foodItems/');
  };

  return (
    <>
      <Head>
        <title>Edit Food Item</title>
      </Head>

      {currentItem ? (
        <>
          <h1>Edit a food item</h1>
          <form onSubmit={handleSubmit(submitEditedFoodItem)} className={style.form}>
            <fieldset>
              <legend className={style.header}>Name</legend>
              <label htmlFor="name">
                Name
                <input
                  id="name"
                  name="name"
                  placeholder="name"
                  {...register('name', { required: true })}
                />
              </label>
              {errors.name && <p className={style.errorMessage}>Name is required! &#128123;</p>}
            </fieldset>

            <fieldset>
              <legend className={style.header}>Nutrition</legend>
              <label htmlFor="kcal">
                &#128293; Kcal
                <input
                  id="kcal"
                  name="kcal"
                  placeholder="kcal per 100g"
                  {...register('kcal', {
                    validate: (value) => /\D+/.test(value) !== true,
                  })}
                />
              </label>
              {errors.kcal
              && <p className={style.errorMessage}>Use only whole numbers for kcal!</p>}

              <label htmlFor="fats">
                &#129361; Fats
                <input
                  id="fats"
                  name="fats"
                  placeholder="fats per 100g"
                  {...register('fats', {
                    validate: {
                      positive: (value) => (Number(value) >= 0) || value.length < 1,
                    },
                  })}
                />
              </label>
              {errors.fats
                && (
                <p className={style.errorMessage}>
                  Example of accepted format for numbers: 12.05
                </p>
                )}

              <label htmlFor="carbohydrates">
                &#127834; Carbohydrates
                <input
                  id="carbohydrates"
                  name="carbohydrates"
                  placeholder="carbohydrates per 100g"
                  {...register('carbohydrates', {
                    validate: {
                      positive: (value) => (Number(value) >= 0) || value.length < 1,
                    },
                  })}
                />
              </label>
              {errors.carbohydrates
                && (
                <p className={style.errorMessage}>
                  Example of accepted format for numbers: 12.05
                </p>
                )}

              <label htmlFor="proteins">
                &#127830; Proteins
                <input
                  id="proteins"
                  name="proteins"
                  placeholder="proteins per 100g"
                  {...register('proteins', {
                    validate: {
                      positive: (value) => (Number(value) >= 0) || value.length < 1,
                    },
                  })}
                />
              </label>
              {errors.proteins
              && (
                <p className={style.errorMessage}>
                  Example of accepted format for numbers: 12.05
                </p>
              )}
            </fieldset>

            <fieldset>
              <legend className={style.header}>Prices</legend>
              <label htmlFor="costPerKg">
                Cost per kg
                <input
                  id="costPerKg"
                  name="costPerKg"
                  placeholder="cost per kg"
                  {...register('costPerKg', {
                    validate: {
                      positive: (value) => (Number(value) >= 0) || value.length < 1,
                    },
                  })}
                />
              </label>
              {errors.costPerKg
                && (
                <p className={style.errorMessage}>
                  Example of accepted format for numbers: 12.05
                </p>
                )}
            </fieldset>

            <button type="submit">Update Item</button>
          </form>

          <form onSubmit={handleSubmit(handleDeleteSubmit)}>
            <button type="submit" className="deleteButton">Delete Item &#128465;</button>
          </form>

          {isSaved === true
          && (
            <p>
              {'Updated! '}
              &#128516;
              {' '}
              <Link href={`/foodItems/details/${itemId}`}>
                <a>View Food Item</a>
              </Link>
            </p>
          )}
        </>
      ) : <p>Loading...</p>}
    </>
  );
}
