import Head from 'next/head';
import { useContext } from 'react';
import { GoalContext } from '../contexts/GoalContext';
import style from '../styles/Form.module.css';

export default function EditGoals() {
  const goalContext = useContext(GoalContext);

  // Fill form-inputs with info saved from local storage.
  const loadFromStorage = () => {
    if (typeof window !== 'undefined') {
      const loadGoals = JSON.parse(window.localStorage.getItem('goals'));
      goalContext.setKcal(loadGoals.kcal);
      goalContext.setFat(loadGoals.fat);
      goalContext.setCarbs(loadGoals.carbs);
      goalContext.setProtein(loadGoals.protein);
    }
  };

  // Take info from context and save into local storage.
  const saveGoals = (event) => {
    event.preventDefault();

    const newGoals = {
      kcal: goalContext.kcal,
      fat: goalContext.fat,
      carbs: goalContext.carbs,
      protein: goalContext.protein,
    };

    localStorage.setItem('goals', JSON.stringify(newGoals));
  };

  return (
    <>
      <Head>
        <title>Edit Goals</title>
      </Head>

      <h1>Edit your nutrition goals</h1>
      <button type="button" onClick={loadFromStorage}>Load Previously Saved Goals</button>

      <form onSubmit={saveGoals} className={style.form}>
        <fieldset>
          <legend className={style.header}>Calories</legend>
          <label htmlFor="goalKcal">
            kcal
            <input
              id="goalKcal"
              name="goalKcal"
              placeholder="min kcal per day"
              value={goalContext.kcal}
              onChange={(e) => (goalContext.setKcal(e.target.value))}
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
              value={goalContext.fat}
              onChange={(e) => (goalContext.setFat(e.target.value))}
            />
          </label>
          <label htmlFor="goalCarbs">
            Carbohydrates
            <input
              id="goalCarbs"
              name="goalCarbs"
              placeholder="min carbs g/day"
              value={goalContext.carbs}
              onChange={(e) => (goalContext.setCarbs(e.target.value))}
            />
          </label>
          <label htmlFor="goalProtein">
            Proteins
            <input
              id="goalProtein"
              name="goalProtein"
              placeholder="min protein g/day"
              value={goalContext.protein}
              onChange={(e) => (goalContext.setProtein(e.target.value))}
            />
          </label>
        </fieldset>

        <button type="submit">Save Goals</button>
      </form>
    </>
  );
}
