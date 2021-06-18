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
            kcal
            <input
              id="goalKcal"
              name="goalKcal"
              placeholder="min kcal per day"
              {...register('kcal', {
                validate: (value) => /\D+/.test(value) !== true,
              })}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend className={style.header}>Macro Nutrients</legend>
          <label htmlFor="goalFat">
            Fats
            <input
              id="goalFat"
              name="goalFat"
              placeholder="min fats g/day"
              {...register('fats', {
                validate: (value) => /\D+/.test(value) !== true,
              })}
            />
          </label>
          <label htmlFor="goalCarbs">
            Carbohydrates
            <input
              id="goalCarbs"
              name="goalCarbs"
              placeholder="min carbs g/day"
              {...register('carbohydrates', {
                validate: (value) => /\D+/.test(value) !== true,
              })}
            />
          </label>
          <label htmlFor="goalProtein">
            Proteins
            <input
              id="goalProtein"
              name="goalProtein"
              placeholder="min protein g/day"
              {...register('proteins', {
                validate: (value) => /\D+/.test(value) !== true,
              })}
            />
          </label>
        </fieldset>
        <button type="submit">Save Goals</button>
        <p>{isSaved ? 'Saved!' : ''}</p>
        {(errors.kcal || errors.fats || errors.carbohydrates
        || errors.proteins) && (
          <p>Only use whole numbers!</p>
        )}
      </form>
    </>
  );
}
