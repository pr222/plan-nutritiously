/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getFromStorage, updateItemInArray } from '../utils/handleStorage';
import MealPlan from '../classes/MealPlan';
// import FoodItem from '../classes/FoodItem';
import Ingredient from '../classes/Ingredient';
import style from '../styles/Form.module.css';
// import SidebarNav from './Sidebar-nav';

const MealPlanEditor = ({ mealplan }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [currentMealPlan, setCurrentMealPlan] = useState({});
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const [queryValue, setQueryValue] = useState('');
  const [currentEdit, setCurrentEdit] = useState();
  // const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setCurrentMealPlan(mealplan);
  }, [mealplan]);

  useEffect(() => {
    const getFoodItems = async () => {
      const res = await getFromStorage('foodItems');
      setFoodItems(res);
    };

    const getIngredients = async () => {
      const res = await getFromStorage('mealPlans');
      if (res !== null) {
        const plan = res.find((elem) => elem.id === mealplan.id);
        console.log(plan);
        if (plan) {
          setCurrentIngredients(plan.ingredients);
        }
      }
    };

    getFoodItems();
    getIngredients();
  }, [mealplan.id]);

  const handleQueryValue = (event) => {
    setQueryValue(event.target.value);
  };

  const submitAddNewIngredient = (data) => {
    console.log(data);
    console.log(queryValue);
    const food = foodItems.find((elem) => elem.id === queryValue);
    // const foodAsClass = Object.assign(new FoodItem(), food);
    console.log(food);
    // console.log(foodAsClass);
    // const ingredient = new Ingredient(foodAsClass, data);
    const ingredient = new Ingredient(food, Number(data.amount));
    console.log(ingredient);
    const ingredients = Array.from(currentIngredients);
    ingredients.push(ingredient);

    setCurrentIngredients(ingredients);
  };

  const submitEditIngredient = (data) => {
    console.log(data);
    console.log(data.ingredientId);
    console.log(data.editValue);
    const ingredient = currentIngredients.find((elem) => elem.id === data.ingredientId);
    ingredient.amount = Number(data.editValue);
    const index = currentIngredients.findIndex((elem) => elem.id === data.ingredientId);

    const ingredients = Array.from(currentIngredients);

    ingredients.splice(index, 1, ingredient);

    setCurrentIngredients(ingredients);
    setCurrentEdit();
    // setIsEditing(false);
  };

  const handleDeleteIngredient = (event) => {
    event.preventDefault();
    console.log(event.target.id);
    // const ingToDelete = currentIngredients.find((elem) => elem.id === event.target.id);
    const index = currentIngredients.findIndex((elem) => elem.id === event.target.id);
    console.log(index);
    const ingredients = Array.from(currentIngredients);

    ingredients.splice(index, 1);

    setCurrentIngredients(ingredients);
  };

  const submitSaveMealPlan = async () => {
    const plan = {
      ...currentMealPlan,
    };

    plan.ingredients = currentIngredients;

    await updateItemInArray('mealPlans', plan);

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  const toggleEdit = (event) => {
    // const ingredient = currentIngredients.find((elem) => elem.id === event.target.id);
    // console.log(event.target.id);
    // console.log('TOGGLE THIS: ', ingredient);
    // setCurrentEdit(ingredient);
    setCurrentEdit(event.target.id);
    // setIsEditing(true);
    // if (isEdit === true) {
    //   setIsEdit(false);
    // } else {
    //   setIsEdit(true);
    // }
  };

  useEffect(() => {
    if (currentEdit) {
      const ingredient = currentIngredients.find((elem) => elem.id === currentEdit);
      if (ingredient) {
        reset({ editValue: ingredient.amount });
      }
    }
  }, [reset, currentEdit, currentIngredients]);

  return (
    <>
      <h2>{currentMealPlan.name}</h2>

      {foodItems
        ? (
          <form onSubmit={handleSubmit(submitAddNewIngredient)} className={style.form}>
            <fieldset>
              <label htmlFor="selectFoodItem">
                Choose a food:
                <select {...register('selectFoodItem')} value={queryValue} onChange={handleQueryValue}>
                  <option key="option-default" value="">Foods</option>
                  {foodItems.map((elem) => (
                    <option key={`option-${elem.id}`} value={elem.id}>{elem.name}</option>
                  ))}
                </select>
              </label>
              <label htmlFor="amount">
                Amount
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
        )
        : <p>Go create some food into your collection!</p>}

      <form onSubmit={handleSubmit(submitSaveMealPlan)} className={style.form}>
        <button type="submit">Save current ingredients list to Meal Plan</button>
      </form>

      {isSaved === true && <p>Meal Plan Saved!</p>}

      <h3>Ingredients</h3>
      {currentIngredients.length
        ? (
          <>
            <p>Current ingredients</p>
            {currentIngredients.map((elem) => (
              <li key={`ing-${elem.id}`}>

                {elem.id === currentEdit
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
                      <form onSubmit={handleDeleteIngredient} id={elem.id}>
                        <button type="submit">Delete Item</button>
                      </form>
                    </>
                  ) : (
                    <>
                      {`${elem.amount} g of ${elem.name} `}
                      {/* <p>{elem.id}</p> */}
                      <button type="button" onClick={toggleEdit} id={elem.id}>Edit</button>
                    </>
                  )}
              </li>
            ))}
          </>
        )
        : <p>No ingredients added yet to the meal plan....</p>}
    </>
  );
};

MealPlanEditor.propTypes = {
  mealplan: PropTypes.instanceOf(MealPlan).isRequired,
};

export default MealPlanEditor;
