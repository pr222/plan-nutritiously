/* eslint-disable react/jsx-props-no-spreading */
// import { useRouter } from 'next/router';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import localForage from 'localforage';
import style from '../styles/Form.module.css';

export default function CreateCustomFoodItem() {
  // const router = useRouter();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const submitCustomFoodItem = async (data) => {
    // event.preventDefault();
    // console.log(data.name);

    const foodItem = {
      custom: true,
      name: data.name,
      nutrition: {
        kcal: data.kcal,
        fats: data.fats,
        carbohydrates: data.carbohydrates,
        proteins: data.proteins,
      },
      cost: {
        low: data.lowCost,
      },
    };
    // Food item to be added into storage.
    // console.log(foodItem);

    let array;
    const prev = await localForage.getItem('foodItems');
    if (!prev) {
      const initial = [];
      await localForage.setItem('foodItems', initial);
      array = initial;
    } else {
      array = prev;
    }

    array.push(foodItem);

    await localForage.setItem('foodItems', array);
    // const gotten = await localForage.getItem('foodItems');
    // console.log('GOT: ', gotten);

    // SAVE TO A DB VIA FUTURE API
    // await fetch('/api/foodItems/create-foodItem', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ foodItem }),
    // }).then(async (res) => {
    //   const response = await res.json();
    //   console.log('JSON', response);
    //   if (res.ok) router.push('/');
    // });
  };

  return (
    <>
      <Head>
        <title>Create Custom Food Item</title>
      </Head>
      <h1>Create a custom food item</h1>
      {/* handleSubmit makes the validation before proceeding to submitCustomFoodItem */}
      <form onSubmit={handleSubmit(submitCustomFoodItem)} className={style.form}>
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
            {errors.kcal && <p className={style.errorMessage}>Use only whole numbers for kcal!</p>}
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
              {...register('carbohydrates', {
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
              {...register('proteins', {
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
              {...register('lowCost', {
                validate: {
                  positive: (value) => (Number(value) > 0) || value.length < 1,
                },
              })}
            />
          </label>
        </fieldset>
        {(errors.fats || errors.carbohydrates) && (
          <p>Example of accepted format for numbers: 12.05</p>
        )}
        <button type="submit">Create Item</button>
      </form>
    </>
  );
}
