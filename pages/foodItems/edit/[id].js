/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import localForage from 'localforage';
import style from '../../../styles/Form.module.css';

export default function EditItem() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const itemId = Number(router.query.id);
  const [foodItems, setFoodItems] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const foodItem = foodItems.find((it) => it.id === Number(itemId));

  const replaceInStorage = async (newItem) => {
    const oldItems = await localForage.getItem('foodItems');

    const itemIndex = oldItems.findIndex((elem) => elem.id === itemId);
    const newItems = Array.from(oldItems);
    newItems.splice(itemIndex, 1, newItem);

    await localForage.setItem('foodItems', newItems);

    router.push('/foodItems');
  };

  useEffect(() => {
    const getItems = async () => {
      const res = await localForage.getItem('foodItems');
      if (res !== null) {
        setFoodItems(res);
        const item = res.find((elem) => elem.id === itemId);
        reset(item);
      }
    };
    getItems();
  }, [reset, itemId]);

  const submitEditedFoodItem = async (data) => {
    const updatedFoodItem = {
      id: foodItem.id,
      custom: foodItem.custom,
      name: data.name,
      nutrition: {
        kcal: data.nutrition.kcal,
        fats: data.nutrition.fats,
        carbohydrates: data.nutrition.carbohydrates,
        proteins: data.nutrition.proteins,
      },
      cost: {
        low: data.cost.low,
      },
    };

    replaceInStorage(updatedFoodItem);
  };

  return (
    <>
      <Head>
        <title>Edit Food Item</title>
      </Head>

      {foodItem ? (
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
                  {...register('nutrition.kcal', {
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
                  {...register('nutrition.fats', {
                    validate: {
                      positive: (value) => (Number(value) > 0) || value.length < 1,
                    },
                  })}
                />
              </label>
              <label htmlFor="carbohydrates">
                Carbohydrates
                {errors.carbohydrates && <p className={style.errorMessage}>Invalid number!</p>}
                <input
                  id="carbohydrates"
                  name="carbohydrates"
                  placeholder="carbohydrates per 100g"
                  {...register('nutrition.carbohydrates', {
                    validate: {
                      positive: (value) => (Number(value) > 0) || value.length < 1,
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
                  {...register('nutrition.proteins', {
                    validate: {
                      positive: (value) => (Number(value) > 0) || value.length < 1,
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
                  {...register('cost.low', {
                    validate: {
                      positive: (value) => (Number(value) > 0) || value.length < 1,
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
