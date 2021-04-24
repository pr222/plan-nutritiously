import Head from 'next/head';
import { useContext } from 'react';
import { GoalContext } from '../contexts/GoalContext';
import style from '../styles/Form.module.css';

export default function EditGoals() {
  const goalContext = useContext(GoalContext);

  const loadFromStorage = () => {
    if (typeof window !== 'undefined') {
      console.log('GET LOCAL');
      // console.log(goalContext.goals);
      const loadGoals = JSON.parse(window.localStorage.getItem('goals'));
      console.log(loadGoals);
      goalContext.setKcal(loadGoals.kcal);
      goalContext.setFat(loadGoals.fat);
      goalContext.setCarbs(loadGoals.carbs);
      goalContext.setProtein(loadGoals.protein);
    }
  };

  const saveGoals = (event) => {
    event.preventDefault();

    // goal.setKcal = event.target.goalKcal.value;
    // goal.setFat = event.target.goalFat.value;
    // goal.setCarbs = event.target.goalCarbs.value;
    // goal.setProtein = event.target.goalProtein.value;
    // console.log(goal);
    // localStorage.setItem('goalKcal', goal.kcal);
    // localStorage.setItem('goalFat', goal.fat);
    // localStorage.setItem('goalCarbs', goal.carbs);
    // localStorage.setItem('goalProtein', goal.protein);
    const newGoals = {
      kcal: goalContext.kcal,
      fat: goalContext.fat,
      carbs: goalContext.carbs,
      protein: goalContext.protein,
    };

    localStorage.setItem('goals', JSON.stringify(newGoals));
    console.log('SAVED!');
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
          {/* <label htmlFor="goalsKcal">
            kcal
            <input
              id="goalsKcal"
              name="goalsKcal"
              placeholder="min kcals per day"
              value={goalContext.goals.kcal}
              onChange={(e) => (goalContext.setGoals({ kcal: e.target.value }))}
            />
          </label> */}
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
