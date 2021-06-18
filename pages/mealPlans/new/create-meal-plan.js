/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addItemToArray } from '../../../utils/handleStorage';
import style from '../../../styles/Form.module.css';
import MealPlan from '../../../classes/MealPlan';

export default function CreateMealPlan() {
  const [isCreated, setIsCreated] = useState(false);
  const [createdId, setCreatedId] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitMealPlan = async (data) => {
    setIsCreated(false);
    const mealPlan = new MealPlan(data.name);

    addItemToArray('mealPlans', mealPlan);

    setCreatedId(mealPlan.id);
    setIsCreated(true);
  };

  return (
    <>
      <Head>
        <title>Create Meal Plan</title>
      </Head>

      <h1>Create a Meal Plan</h1>

      <form onSubmit={handleSubmit(submitMealPlan)} className={style.form}>
        <fieldset>
          <legend className={style.header}>Name your Meal Plan</legend>
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

        <button type="submit">Create Meal Plan</button>

        {isCreated === true
          && (
            <p>
              {'Created! '}
              <Link href={`/mealPlans/details/${createdId}`}>
                <a>View Meal Plan</a>
              </Link>
            </p>
          )}
      </form>
    </>
  );
}
