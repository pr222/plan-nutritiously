import Head from 'next/head';
import style from '../styles/Form.module.css';

export default function CreateCustomFoodItem() {
  const submitCustomFoodItem = (event) => {
    event.preventDefault();

    const foodItem = {
      custom: true,
      name: event.target.name.value,
      nutrition: {
        kcal: event.target.kcal.value,
        fats: event.target.fats.value,
        carbohydrates: event.target.carbohydrates.value,
        proteins: event.target.proteins.value,
      },
      cost: {
        low: event.target.cost.value,
      },
    };
    // Food item to be added into storage.
    console.log(foodItem);
  };

  return (
    <>
      <Head>
        <title>Create Custom Food Item</title>
      </Head>
      <form onSubmit={submitCustomFoodItem} className={style.form}>
        <fieldset>
          <legend className={style.header}>Create a custom food item</legend>
          <label htmlFor="name">
            Name
            <input
              id="name"
              name="name"
              placeholder="name"
              required
             /* value={goalState.kcal}
              onChange={(e) => (setGoalState(
                { ...goalState, kcal: e.target.value },
              ))} */
            />
          </label>
          <label htmlFor="kcal">
            Kcal
            <input
              id="kcal"
              name="kcal"
              placeholder="kcal per 100g"
             /* value={goalState.kcal}
              onChange={(e) => (setGoalState(
                { ...goalState, kcal: e.target.value },
              ))} */
            />
          </label>
          <label htmlFor="fats">
            Fats
            <input
              id="fats"
              name="fats"
              placeholder="fats per 100g"
             /* value={goalState.kcal}
              onChange={(e) => (setGoalState(
                { ...goalState, kcal: e.target.value },
              ))} */
            />
          </label>
          <label htmlFor="carbohydrates">
            Carbohydrates
            <input
              id="carbohydrates"
              name="carbohydrates"
              placeholder="carbohydrates per 100g"
             /* value={goalState.kcal}
              onChange={(e) => (setGoalState(
                { ...goalState, kcal: e.target.value },
              ))} */
            />
          </label>
          <label htmlFor="proteins">
            Proteins
            <input
              id="proteins"
              name="proteins"
              placeholder="proteins per 100g"
             /* value={goalState.kcal}
              onChange={(e) => (setGoalState(
                { ...goalState, kcal: e.target.value },
              ))} */
            />
          </label>
          <label htmlFor="cost">
            Cost
            <input
              id="cost"
              name="cost"
              placeholder="cost per kg"
             /* value={goalState.kcal}
              onChange={(e) => (setGoalState(
                { ...goalState, kcal: e.target.value },
              ))} */
            />
          </label>
        </fieldset>
        <button type="submit">Save Item</button>
        {/* <p>{isSaved ? 'Saved!' : ''}</p>
        <p>{error.message.length > 1 ? `${error.message}` : ''}</p> */}
      </form>
    </>
  );
}
