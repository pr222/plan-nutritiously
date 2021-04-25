import Head from 'next/head';
// import { useContext, useState } from 'react';
import { useState } from 'react';
// import { GoalContext } from '../contexts/GoalContext';
import style from '../styles/Form.module.css';

export default function EditGoals() {
  // const goalContext = useContext(GoalContext);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState({ message: '' });

  // Default values for goal-state
  const goal = {
    kcal: '',
    fat: '',
    carbs: '',
    protein: '',
  };

  // Get values for goal state from localStorage if available
  if (typeof window !== 'undefined') {
    const loadedGoal = JSON.parse(window.localStorage.getItem('goals'));
    if (loadedGoal !== null) {
      goal.kcal = loadedGoal.kcal;
      goal.fat = loadedGoal.fat;
      goal.carbs = loadedGoal.carbs;
      goal.protein = loadedGoal.protein;
    }
  }

  // Set goal state values with default or updated from localStorage
  const [goalState, setGoalState] = useState({
    kcal: goal.kcal,
    fat: goal.fat,
    carbs: goal.carbs,
    protein: goal.protein,
  });

  const validateForm = (input) => {
    let validated;
    // ADD ERROR MESSAGE-DISPLAYING FOR USER

    // Only accept whole digits.
    if (/\D+/.test(input.goalKcal.value) || /\D+/.test(input.goalFat.value) || /\D+/.test(input.goalCarbs.value) || /\D+/.test(input.goalProtein.value)) {
      validated = false;
    } else {
      validated = true;
    }

    return validated;
  };

  // Take info from context and save into local storage.
  const submitGoals = async (event) => {
    event.preventDefault();

    const isValid = validateForm(event.target);

    if (isValid) {
      setError({ message: '' });
      // localStorage.setItem('goals', JSON.stringify(goalContext.goals));
      localStorage.setItem('goals', JSON.stringify(goalState));

      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
    } else {
      setError({ message: 'Only use whole numbers!' });
      console.log(error.message.length);
      // ADD ERROR MESSAGE-DISPLAYING FOR USER
      // console.log('NOT SUBMITTED');
    }
  };

  return (
    <>
      <Head>
        <title>Edit Goals</title>
      </Head>

      <h1>Edit your nutrition goals</h1>

      <form onSubmit={submitGoals} className={style.form}>
        <fieldset>
          <legend className={style.header}>Calories</legend>
          <label htmlFor="goalKcal">
            kcal
            <input
              id="goalKcal"
              name="goalKcal"
              placeholder="min kcal per day"
              // value={goalContext.goals.kcal}
              // onChange={(e) => (goalContext.setGoals(
              //   { ...goalContext.goals, kcal: e.target.value },
              // ))}
              value={goalState.kcal}
              onChange={(e) => (setGoalState(
                { ...goalState, kcal: e.target.value },
              ))}
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
              // value={goalContext.goals.fat}
              // onChange={(e) => (goalContext.setGoals(
              //   { ...goalContext.goals, fat: e.target.value },
              // ))}
              value={goalState.fat}
              onChange={(e) => (setGoalState(
                { ...goalState, fat: e.target.value },
              ))}
            />
          </label>
          <label htmlFor="goalCarbs">
            Carbohydrates
            <input
              id="goalCarbs"
              name="goalCarbs"
              placeholder="min carbs g/day"
              // value={goalContext.goals.carbs}
              // onChange={(e) => (goalContext.setGoals(
              //   { ...goalContext.goals, carbs: e.target.value },
              // ))}
              value={goalState.carbs}
              onChange={(e) => (setGoalState(
                { ...goalState, carbs: e.target.value },
              ))}
            />
          </label>
          <label htmlFor="goalProtein">
            Proteins
            <input
              id="goalProtein"
              name="goalProtein"
              placeholder="min protein g/day"
              // value={goalContext.goals.protein}
              // onChange={(e) => (goalContext.setGoals(
              //   { ...goalContext.goals, protein: e.target.value },
              // ))}
              value={goalState.protein}
              onChange={(e) => (setGoalState(
                { ...goalState, protein: e.target.value },
              ))}
            />
          </label>
        </fieldset>
        <button type="submit">Save Goals</button>
        <p>{isSaved ? 'Saved!' : ''}</p>
        {error.message.length > 1 ? <div>{error.message}</div> : ''}
      </form>
    </>
  );
}