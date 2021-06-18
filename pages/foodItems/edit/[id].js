/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { deleteItemInArray, getFromStorage, updateItemInArray } from '../../../utils/handleStorage';
import style from '../../../styles/Form.module.css';
import FoodItem from '../../../classes/FoodItem';

export default function EditFoodItem() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

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

        router.reload();
        router.back();
      }
    }
  };

  const handleDeleteSubmit = async () => {
    await deleteItemInArray('foodItems', currentItem);
    // const res = await localForage.getItem('foodItems');
    // if (res !== null) {
    //   const filteredItems = res.filter((elem) => elem.id !== itemId);

    //   await localForage.setItem('foodItems', filteredItems);

    router.push('/foodItems/');
    // }
  };

  return (
    <>
      <Head>
        <title>Edit Food Item</title>
      </Head>

      <button type="button" onClick={goBack}>Back</button>
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
              <label htmlFor="costPerKg">
                Cost per kg
                {errors.costPerKg && <p className={style.errorMessage}>Invalid number!</p>}
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
            </fieldset>
            {(errors.fats || errors.carbohydrates
            || errors.proteins || errors.costPerKg) && (
              <p>Example of accepted format for numbers: 12.05</p>
            )}
            <button type="submit">Update Item</button>
          </form>

          <form onSubmit={handleSubmit(handleDeleteSubmit)}>
            <button type="submit">Delete Item</button>
          </form>
        </>
      ) : <p>Loading...</p>}
    </>
  );
}
