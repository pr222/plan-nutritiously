/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addItemToArray } from '../../../utils/handleStorage';
import style from '../../../styles/Form.module.css';
import FoodItem from '../../../classes/FoodItem';

export default function CreateFoodItem() {
  const [isCreated, setIsCreated] = useState(false);
  const [createdId, setCreatedId] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitCustomFoodItem = async (data) => {
    setIsCreated(false);

    const food = new FoodItem();

    food.name = data.name;
    food.kcal = data.kcal;
    food.fats = data.fats;
    food.carbohydrates = data.carbohydrates;
    food.proteins = data.proteins;
    food.costPerKg = data.costPerKg;

    addItemToArray('foodItems', food);

    setCreatedId(food.id);
    setIsCreated(true);
  };

  return (
    <>
      <Head>
        <title>Create New Food Item</title>
      </Head>

      <h1>Create a new food item</h1>

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
                  positive: (value) => (Number(value) >= 0) || value.length < 1,
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
            {errors.lowCost && <p className={style.errorMessage}>Invalid number!</p>}
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

        <button type="submit">Create Item</button>

        {isCreated === true
          && (
            <p>
              {'Created! '}
              <Link href={`/foodItems/details/${createdId}`}>
                <a>View Food Item</a>
              </Link>
            </p>
          )}
      </form>
    </>
  );
}
