/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getFromStorage, setToStorage } from '../../utils/handleStorage';
import style from '../../styles/Form.module.css';

export default function EditGoals() {
  const [isSaved, setIsSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const prefillForm = async () => {
      const res = await getFromStorage('goals');
      if (res !== null) {
        reset(res);
      }
    };

    prefillForm();
  }, [reset]);

  const submitGoals = async (data) => {
    const goals = {
      kcal: data.kcal,
      fats: data.fats,
      carbohydrates: data.carbohydrates,
      proteins: data.proteins,
    };

    await setToStorage('goals', goals);

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Edit Goals</title>
      </Head>

      <h1>Edit nutrition goals</h1>

      <form onSubmit={handleSubmit(submitGoals)} className={style.form}>
        <fieldset>
          <legend className={style.header}>Calories</legend>
          <label htmlFor="goalKcal">
            &#128293; Kcal
            <input
              id="goalKcal"
              name="goalKcal"
              placeholder="min kcal per day"
              {...register('kcal', {
                validate: (value) => /\D+/.test(value) !== true,
              })}
            />
          </label>
          {errors.kcal && <p className={style.errorMessage}>Only use whole numbers!</p>}
        </fieldset>

        <fieldset>
          <legend className={style.header}>Macro Nutrients</legend>
          <label htmlFor="goalFat">
            &#129361; Fats
            <input
              id="goalFat"
              name="goalFat"
              placeholder="min fats g/day"
              {...register('fats', {
                validate: (value) => /\D+/.test(value) !== true,
              })}
            />
          </label>
          {errors.fats
          && (
            <p className={style.errorMessage}>
              Only use whole numbers!
            </p>
          )}

          <label htmlFor="goalCarbs">
            &#127834; Carbohydrates
            <input
              id="goalCarbs"
              name="goalCarbs"
              placeholder="min carbs g/day"
              {...register('carbohydrates', {
                validate: (value) => /\D+/.test(value) !== true,
              })}
            />
          </label>
          {errors.carbohydrates
            && (
              <p className={style.errorMessage}>
                Only use whole numbers!
              </p>
            )}

          <label htmlFor="goalProtein">
            &#127830; Proteins
            <input
              id="goalProtein"
              name="goalProtein"
              placeholder="min proteins g/day"
              {...register('proteins', {
                validate: (value) => /\D+/.test(value) !== true,
              })}
            />
          </label>
          {errors.proteins
            && (
              <p className={style.errorMessage}>
                Only use whole numbers!
              </p>
            )}
        </fieldset>

        <button type="submit">Save Goals</button>

        {isSaved === true && <p>Goals Saved! &#128516;</p>}

      </form>
    </>
  );
}
