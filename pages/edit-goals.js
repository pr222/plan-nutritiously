/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import localForage from 'localforage';
import style from '../styles/Form.module.css';

// export default function EditGoals() {
//   const [isSaved, setIsSaved] = useState(false);
//   const [error, setError] = useState({ message: '' });

//   // Default values for goal-state.
//   const goal = {
//     kcal: '',
//     fat: '',
//     carbs: '',
//     protein: '',
//   };

//   // Get values for goal state from localStorage if available.
//   if (typeof window !== 'undefined') {
//     const loadedGoal = JSON.parse(window.localStorage.getItem('goals'));
//     if (loadedGoal !== null) {
//       goal.kcal = loadedGoal.kcal;
//       goal.fat = loadedGoal.fat;
//       goal.carbs = loadedGoal.carbs;
//       goal.protein = loadedGoal.protein;
//     }
//   }

//   // Set state with default or updated values.
//   const [goalState, setGoalState] = useState({
//     kcal: goal.kcal,
//     fat: goal.fat,
//     carbs: goal.carbs,
//     protein: goal.protein,
//   });

//   // Form validation
//   const validateForm = (input) => {
//     let valid;

//     // Only accept whole digits
//     if (/\D+/.test(input.goalKcal.value) ||
//  /\D+/.test(input.goalFat.value) ||
// /\D+/.test(input.goalCarbs.value) ||
// /\D+/.test(input.goalProtein.value)) {
//       valid = false;
//     } else {
//       valid = true;
//     }

//     return valid;
//   };

//   // Form sumbission.
//   const submitGoals = async (event) => {
//     event.preventDefault();

//     const isValid = validateForm(event.target);

//     if (isValid) {
//       setError({ message: '' });

//       localStorage.setItem('goals', JSON.stringify(goalState));

//       setIsSaved(true);
//       setTimeout(() => {
//         setIsSaved(false);
//       }, 2000);
//     } else {
//       setError({ message: 'Only use whole numbers!' });
//     }
//   };
export default function EditGoals() {
  // const [input, setInput] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  // Default values for goal-state.
  const goal = {
    kcal: '',
    fats: '',
    carbohydrates: '',
    proteins: '',
  };

  // Get values for goal state from browser
  if (typeof window !== 'undefined') {
    const loadedGoal = async () => {
      await localForage.getItem('goals');
    };
    if (loadedGoal !== null) {
      goal.kcal = loadedGoal.kcal;
      goal.fats = loadedGoal.fats;
      goal.carbohydrates = loadedGoal.carbohydrates;
      goal.proteins = loadedGoal.proteins;
    }
  }

  // Set state with default or updated values
  const [goalState, setGoalState] = useState({
    kcal: goal.kcal,
    fat: goal.fat,
    carbs: goal.carbs,
    protein: goal.protein,
  });
  // const getItems = async () => {
  //   const res = await localForage.getItem('goals');
  //   if (res !== null) {
  //     console.log('res', res);
  //     setPreValues({
  //       kcal: res.kcal,
  //       fats: res.fats,
  //       carbohydrates: res.carbohydrates,
  //       proteins: res.proteins,
  //     });
  //     console.log(preValues);
  //   }
  // };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // } = useForm({
  //   defaultValues: {
  //     kcal: preValues.kcal,
  //     fats: preValues.fats,
  //     carbohydrates: preValues.carbohydrates,
  //     proteins: preValues.proteins,
  //   },
  // });

  // if (window !== undefined) {
  //   getItems();
  // }

  useEffect(() => {
    const getItems = async () => {
      const res = await localForage.getItem('goals');
      if (res !== null) {
        reset(res);
      }
    };
    getItems();
    //   console.log(getItems);
    // let goal = {
    //   kcal: '',
    //   fats: '',
    //   carbohydrates: '',
    //   proteins: '',
    // };
    // const getItems = async () => {
    //   const res = await localForage.getItem('goals');
    //   if (res !== null) {
    //     console.log(goal);
    //     goal = res;
    //     console.log(goal);
    //   }
    // };

    // if (typeof window !== 'undefined') {
    //   getItems();
    // }
  }, [reset]);

  const submitGoals = async (data) => {
    const goals = {
      kcal: data.kcal,
      fats: data.fats,
      carbohydrates: data.carbohydrates,
      proteins: data.proteins,
    };
    console.log(data);
    await localForage.setItem('goals', goals);

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

      <h1>Edit your nutrition goals</h1>

      {/* <form onSubmit={submitGoals} className={style.form}>
        <fieldset>
          <legend className={style.header}>Calories</legend>
          <label htmlFor="goalKcal">
            kcal
            <input
              id="goalKcal"
              name="goalKcal"
              placeholder="min kcal per day"
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
              value={goalState.protein}
              onChange={(e) => (setGoalState(
                { ...goalState, protein: e.target.value },
              ))}
            />
          </label>
        </fieldset>
        <button type="submit">Save Goals</button>
        <p>{isSaved ? 'Saved!' : ''}</p>
        <p>{error.message.length > 1 ? `${error.message}` : ''}</p>
      </form> */}

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
              // value={goalState.kcal}
              // onChange={(e) => (setGoalState(
              //   { ...goalState, kcal: e.target.value },
              // ))}
            />
          </label>
          {/* <Controller
            control={control}
            name="test"
          /> */}
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
              // value={goalState.fats}
              // onChange={(e) => (setGoalState(
              //   { ...goalState, fats: e.target.value },
              // ))}
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
              // value={goalState.carbohydrates}
              // onChange={(e) => (setGoalState(
              //   { ...goalState, carbohydrates: e.target.value },
              // ))}
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
              // value={goalState.proteins}
              // onChange={(e) => (setGoalState(
              //   { ...goalState, proteins: e.target.value },
              // ))}
            />
          </label>
        </fieldset>
        <button type="submit">Save Goals</button>
        <p>{isSaved ? 'Saved!' : ''}</p>
        {/* <p>{error.message.length > 1 ? `${error.message}` : ''}</p> */}
        {(errors.kcal || errors.fats || errors.carbohydrates
        || errors.proteins) && (
          <p>Only use whole numbers!</p>
        )}
      </form>
    </>
  );
}
