/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import localForage from 'localforage';
import Food from '../../../classes/Food';
import style from '../../../styles/Form.module.css';

export default function EditItem() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  const itemId = Number(router.query.id);
  const [currentItem, setCurrentItem] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getItems = async () => {
      const res = await localForage.getItem('foodItems');
      if (res !== null) {
        const foodItem = res.find((elem) => elem.id === itemId);

        if (foodItem) {
          const food = Object.assign(new Food(), foodItem);

          setCurrentItem(food);

          reset({
            name: food.name,
            kcal: food.kcal,
            fats: food.fats,
            carbohydrates: food.carbohydrates,
            proteins: food.proteins,
            lowCost: food.lowCost,
          });
        }
      }
    };
    getItems();
  }, [reset, itemId]);

  const replaceInStorage = async (newItem) => {
    const oldItems = await localForage.getItem('foodItems');

    const itemIndex = oldItems.findIndex((elem) => elem.id === itemId);
    const newItems = Array.from(oldItems);
    newItems.splice(itemIndex, 1, newItem);

    await localForage.setItem('foodItems', newItems);
  };

  const submitEditedFoodItem = async (data) => {
    const res = await localForage.getItem('foodItems');
    if (res !== null) {
      const foodItem = res.find((elem) => elem.id === itemId);

      if (foodItem) {
        const food = Object.assign(new Food(), foodItem);

        try {
          food.name = data.name;
          food.kcal = data.kcal;
          food.fats = data.fats;
          food.carbohydrates = data.carbohydrates;
          food.proteins = data.proteins;
          food.lowCost = data.lowCost;
        } catch (error) {
          console.log(error);
          console.log(error.message);
        }

        replaceInStorage(food);

        router.push('/foodItems');
      }
    }
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
              {errors.name && <p className={style.errorMessage}>Name is required!</p>}
            </fieldset>
            <fieldset>
              <legend className={style.header}>Nutrition</legend>
              <label htmlFor="kcal">
                Kcal
                {errors.kcal
                && <p className={style.errorMessage}>Use only whole numbers for kcal!</p>}
                <input
                  id="kcal"
                  name="kcal"
                  placeholder="kcal per 100g"
                  {...register('kcal', {
                    validate: (value) => /\D+/.test(value) !== true,
                  })}
                />
              </label>
              <label htmlFor="fats">
                Fats
                {errors.fats && <p className={style.errorMessage}>Invalid number!</p>}
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
              <label htmlFor="carbohydrates">
                Carbohydrates
                {errors.carbohydrates
                && <p className={style.errorMessage}>Invalid number!</p>}
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
              <label htmlFor="proteins">
                Proteins
                {errors.proteins && <p className={style.errorMessage}>Invalid number!</p>}
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
            </fieldset>
            <fieldset>
              <legend className={style.header}>Prices</legend>
              <label htmlFor="lowCost">
                Low Cost
                {errors.lowCost && <p className={style.errorMessage}>Invalid number!</p>}
                <input
                  id="lowCost"
                  name="lowCost"
                  placeholder="low cost per kg"
                  {...register('lowCost', {
                    validate: {
                      positive: (value) => (Number(value) >= 0) || value.length < 1,
                    },
                  })}
                />
              </label>
            </fieldset>
            {(errors.fats || errors.carbohydrates
            || errors.proteins || errors.lowCost) && (
              <p>Example of accepted format for numbers: 12.05</p>
            )}
            <button type="submit">Update Item</button>
          </form>
        </>
      ) : <p>Loading...</p>}
      <button type="button" onClick={goBack}>Back</button>
    </>
  );
}
