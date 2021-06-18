/* eslint-disable react/jsx-props-no-spreading */
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { addItemToArray } from '../../../utils/handleStorage';
import style from '../../../styles/Form.module.css';
import MealPlan from '../../../classes/MealPlan';

export default function CreateMealPlan() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitMealPlan = async (data) => {
    const mealPlan = new MealPlan(data.name);

    addItemToArray('mealPlans', mealPlan);

    router.push(`/mealPlans/details/${mealPlan.id}`);
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
      </form>
    </>
  );
}
