import PropTypes from 'prop-types';
import { createContext, useState } from 'react';
import localForage from 'localforage';

export const FoodItemsContext = createContext();

export const FoodItemsProvider = ({ children }) => {
  // Default values for state
  // const goal = {
  //   kcal: '',
  //   fat: '',
  //   carbs: '',
  //   protein: '',
  // };

  // // Get values from localStorage if available
  // if (typeof window !== 'undefined') {
  //   const loadedGoal = JSON.parse(window.localStorage.getItem('goals'));
  //   if (loadedGoal !== null) {
  //     goal.kcal = loadedGoal.kcal;
  //     goal.fat = loadedGoal.fat;
  //     goal.carbs = loadedGoal.carbs;
  //     goal.protein = loadedGoal.protein;
  //   }
  // }

  // // Set state values with default or updated from localStorage
  // const [goals, setGoals] = useState({
  //   kcal: goal.kcal,
  //   fat: goal.fat,
  //   carbs: goal.carbs,
  //   protein: goal.protein,
  // });
  // /////////////////////////////////
  const [foodItems, setFoodItems] = useState([]);

  if (typeof window !== 'undefined') {
    const getItems = async () => {
      const res = await localForage.getItem('foodItems');
      if (res !== null) {
        setFoodItems(res);
      }
    };
    getItems();
  }
  return (
    <FoodItemsContext.Provider
      value={{
        foodItems,
        setFoodItems,
      }}
    >
      {children}
    </FoodItemsContext.Provider>
  );
};

FoodItemsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
