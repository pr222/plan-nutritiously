/* eslint-disable react/jsx-props-no-spreading */
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getFromStorage, updateItemInArray } from '../utils/handleStorage';
import MealPlan from '../classes/MealPlan';
import Ingredient from '../classes/Ingredient';
import style from '../styles/Form.module.css';

const MealPlanEditor = ({ mealplan }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [savedMealPlan, setSavedMealPlan] = useState({});
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const [currentEditId, setCurrentEditId] = useState();
  const [isSaved, setIsSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getFoodItems = async () => {
      const res = await getFromStorage('foodItems');
      setFoodItems(res);
    };

    const getIngredients = async () => {
      const res = await getFromStorage('mealPlans');
      if (res !== null) {
        const plan = res.find((elem) => elem.id === mealplan.id);
        if (plan) {
          setCurrentIngredients(plan.ingredients);
        }
      }
    };

    getFoodItems();
    getIngredients();
  }, [mealplan.id]);

  useEffect(() => {
    setSavedMealPlan(mealplan);
  }, [mealplan]);

  useEffect(() => {
    if (currentEditId) {
      const ingredient = currentIngredients.find((elem) => elem.id === currentEditId);
      if (ingredient) {
        reset({ editValue: ingredient.amount });
      }
    }
  }, [reset, currentEditId, currentIngredients]);

  const submitAddNewIngredient = (data) => {
    const selectedFood = foodItems.find((elem) => elem.id === data.selectedFoodItemId);

    const ingredient = new Ingredient(selectedFood, Number(data.amount));

    const ingredients = Array.from(currentIngredients);
    ingredients.push(ingredient);

    setCurrentIngredients(ingredients);
  };

  const submitEditIngredient = (data) => {
    const ingredient = currentIngredients.find((elem) => elem.id === data.ingredientId);
    const ingredientAsClass = Object.assign(new Ingredient(), ingredient);
    // editedIngredient.amount = Number(data.editValue);
    ingredientAsClass.updateAmount(Number(data.editValue));

    const index = currentIngredients.findIndex((elem) => elem.id === data.ingredientId);
    const updatedIngredients = Array.from(currentIngredients);
    updatedIngredients.splice(index, 1, ingredientAsClass);

    setCurrentIngredients(updatedIngredients);
    setCurrentEditId();
  };

  const submitDeleteIngredient = (data) => {
    const index = currentIngredients.findIndex((elem) => elem.id === data.delIngredientId);
    const updatedIngredients = Array.from(currentIngredients);
    updatedIngredients.splice(index, 1);

    setCurrentIngredients(updatedIngredients);
  };

  const submitSaveMealPlan = async () => {
    // console.log('PROP', mealplan);
    // console.log('SAVED PREV', savedMealPlan);
    const plan = {
      ...savedMealPlan,
    };
    plan.ingredients = currentIngredients;
    const planAsClass = Object.assign(new MealPlan(), plan);
    console.log('AS NEW CLASS', planAsClass);
    // currentIngredients.forEach((elem) => {
    //   planAsClass.replaceIngredient(elem);
    // });
    planAsClass.countTotalCost();
    planAsClass.countTotalNutrients();
    console.log('AFTER METHODS', planAsClass);
    await updateItemInArray('mealPlans', planAsClass);

    setSavedMealPlan(planAsClass);

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  const toggleEdit = (event) => {
    setCurrentEditId(event.target.id);
  };

  return (
    <>
      <h2>{savedMealPlan.name}</h2>

      {foodItems
        ? (
          <>
            <form onSubmit={handleSubmit(submitAddNewIngredient)} className={style.form}>
              <fieldset>
                <label htmlFor="selectedFoodItemId">
                  Choose a food from your collection:
                  <select {...register('selectedFoodItemId')}>
                    <option key="option-default" value="">Foods</option>
                    {foodItems.map((elem) => (
                      <option key={`option-${elem.id}`} value={elem.id}>{elem.name}</option>
                    ))}
                  </select>
                </label>
                <label htmlFor="amount">
                  Amount in grams:
                  {errors.amount && <p className={style.errorMessage}>Invalid number!</p>}
                  <input
                    placeholder="grams"
                    {...register('amount', {
                      validate: {
                        positive: (value) => (Number(value) >= 0) || value.length < 1,
                      },
                    })}
                  />
                </label>
                <button type="submit">Add</button>
              </fieldset>
            </form>

            <form onSubmit={handleSubmit(submitSaveMealPlan)} className={style.form}>
              <button type="submit">Save current ingredients list</button>
            </form>

            {isSaved === true && <p>Meal Plan Saved!</p>}
          </>
        )
        : (
          <>
            <p>Seems like you have no food items in your collection.</p>
            <p>
              <Link href="/foodItems/new/create-food-item"><a>Start adding food items</a></Link>
            </p>
          </>
        )}

      <h3>Ingredients</h3>

      {currentIngredients
        && (
          <>
            {currentIngredients.map((elem) => (
              <li key={`ing-${elem.id}`}>

                {elem.id === currentEditId
                  ? (
                    <>
                      <form onSubmit={handleSubmit(submitEditIngredient)}>
                        <fieldset>
                          <label htmlFor="ingredientName">
                            {elem.name}
                          </label>
                          <label htmlFor="ingredientId">
                            <input
                              type="hidden"
                              {...register('ingredientId')}
                              value={elem.id}
                            />
                          </label>
                          <label htmlFor="editValue">
                            {errors.editValue
                            && <p className={style.errorMessage}>Invalid number!</p>}
                            <input
                              placeholder="grams"
                              {...register('editValue', {
                                validate: {
                                  positive: (value) => (Number(value) >= 0) || value.length < 1,
                                },
                              })}
                            />
                          </label>
                          <button type="submit">Apply</button>
                        </fieldset>
                      </form>

                      <form onSubmit={handleSubmit(submitDeleteIngredient)}>
                        <label htmlFor="delIngredientId">
                          <input
                            type="hidden"
                            {...register('delIngredientId')}
                            value={elem.id}
                          />
                        </label>
                        <button type="submit">Delete Item</button>
                      </form>
                    </>
                  ) : (
                    <>
                      {`${elem.amount} g of ${elem.name} `}
                      <button type="button" onClick={toggleEdit} id={elem.id}>Edit</button>
                    </>
                  )}
              </li>
            ))}
          </>
        )}
    </>
  );
};

MealPlanEditor.propTypes = {
  mealplan: PropTypes.instanceOf(MealPlan).isRequired,
};

export default MealPlanEditor;
