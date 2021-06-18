/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getFromStorage, updateItemInArray, deleteItemInArray } from '../../../utils/handleStorage';
import style from '../../../styles/Form.module.css';
import MealPlan from '../../../classes/MealPlan';

export default function EditMealPlan() {
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
      const res = await getFromStorage('mealPlans');

      if (res !== null) {
        const mealPlan = res.find((elem) => elem.id === itemId);

        if (mealPlan) {
          const plan = Object.assign(new MealPlan(), mealPlan);

          setCurrentItem(plan);

          reset({ name: plan.name });
        }
      }
    };

    prefillForm();
  }, [reset, itemId]);

  const submitEditedMealPlan = async (data) => {
    const res = await getFromStorage('mealPlans');

    if (res !== null) {
      const mealPlan = res.find((elem) => elem.id === itemId);

      if (mealPlan) {
        const plan = Object.assign(new MealPlan(), mealPlan);

        plan.name = data.name;

        await updateItemInArray('mealPlans', plan);

        router.reload();
        router.back();
      }
    }
  };

  const handleDeleteSubmit = async () => {
    await deleteItemInArray('mealPlans', currentItem);

    router.push('/mealPlans/');
  };

  return (
    <>
      <Head>
        <title>Edit Meal Plan</title>
      </Head>
      <button type="button" onClick={goBack}>Back</button>
      {currentItem ? (
        <>
          <h1>
            Meal Plan -
            {` ${currentItem.name}`}
          </h1>
          <form onSubmit={handleSubmit(submitEditedMealPlan)} className={style.form}>
            <fieldset>
              <legend className={style.header}>Information</legend>
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
            <button type="submit">Update</button>
          </form>

          <form onSubmit={handleSubmit(handleDeleteSubmit)}>
            <button type="submit">Delete Item</button>
          </form>
        </>
      ) : <p>Loading...</p>}
    </>
  );
}
