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
    reset();
  };

  const submitEditIngredient = (data) => {
    const ingredient = currentIngredients.find((elem) => elem.id === data.ingredientId);
    const ingredientAsClass = Object.assign(new Ingredient(), ingredient);

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
    const plan = {
      ...savedMealPlan,
    };
    plan.ingredients = currentIngredients;
    const planAsClass = Object.assign(new MealPlan(), plan);

    planAsClass.countTotalCost();
    planAsClass.countTotalNutrients();
    // console.log('AFTER METHODS', planAsClass);
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
      {foodItems
        ? (
          <>
            <form onSubmit={handleSubmit(submitAddNewIngredient)} className={style.form}>
              <fieldset>
                <label htmlFor="selectedFoodItemId">
                  Choose a food from your collection:
                  <select {...register('selectedFoodItemId')}>
                    <option key="option-default" value="">Food Items</option>
                    {foodItems.map((elem) => (
                      <option key={`option-${elem.id}`} value={elem.id}>{elem.name}</option>
                    ))}
                  </select>
                </label>
                <label htmlFor="amount">
                  Amount in grams:
                  <input
                    placeholder="grams"
                    {...register('amount', {
                      validate: {
                        positive: (value) => (Number(value) >= 0) || value.length < 1,
                      },
                    })}
                  />
                </label>
                {errors.amount && <p className={style.errorMessage}>Invalid number! &#128586;</p>}
                <button type="submit">Add</button>
              </fieldset>
            </form>

            <form onSubmit={handleSubmit(submitSaveMealPlan)} className={style.form}>
              <button type="submit">Save current ingredients list</button>
            </form>

            {isSaved === true && <p>Meal Plan Saved! &#128516;</p>}
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
            <ul>
              {currentIngredients.map((elem) => (
                <li key={`ing-${elem.id}`}>
                  {elem.id === currentEditId
                    ? (
                      <>
                        <form onSubmit={handleSubmit(submitEditIngredient)} className={style.form}>
                          <label htmlFor="ingredientId">
                            <input
                              type="hidden"
                              {...register('ingredientId')}
                              value={elem.id}
                            />
                          </label>
                          <label htmlFor="editValue">
                            {elem.name}
                            <input
                              placeholder="grams"
                              {...register('editValue', {
                                validate: {
                                  positive: (value) => (Number(value) >= 0) || value.length < 1,
                                },
                              })}
                            />
                          </label>
                          {errors.editValue
                            && <p className={style.errorMessage}>Invalid number! &#128586;</p>}
                          <button type="submit" className="editButton">Apply</button>
                        </form>

                        {!errors.editValue
                          && (
                            <form onSubmit={handleSubmit(submitDeleteIngredient)}>
                              <label htmlFor="delIngredientId">
                                <input
                                  type="hidden"
                                  {...register('delIngredientId')}
                                  value={elem.id}
                                />
                              </label>
                              <button type="submit" className="deleteButton">{`Delete ${elem.name}`}</button>
                            </form>
                          )}
                      </>
                    ) : (
                      <>
                        <button type="button" onClick={toggleEdit} id={elem.id} className="editButton">Edit</button>
                        {` ${elem.amount} g of ${elem.name} `}
                      </>
                    )}
                </li>
              ))}
            </ul>
          </>
        )}
    </>
  );
};

MealPlanEditor.propTypes = {
  mealplan: PropTypes.instanceOf(MealPlan).isRequired,
};

export default MealPlanEditor;
