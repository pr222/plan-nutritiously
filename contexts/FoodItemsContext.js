import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

export const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  // Default values for state
  const goal = {
    kcal: '',
    fat: '',
    carbs: '',
    protein: '',
  };

  // Get values from localStorage if available
  if (typeof window !== 'undefined') {
    const loadedGoal = JSON.parse(window.localStorage.getItem('goals'));
    if (loadedGoal !== null) {
      goal.kcal = loadedGoal.kcal;
      goal.fat = loadedGoal.fat;
      goal.carbs = loadedGoal.carbs;
      goal.protein = loadedGoal.protein;
    }
  }

  // Set state values with default or updated from localStorage
  const [goals, setGoals] = useState({
    kcal: goal.kcal,
    fat: goal.fat,
    carbs: goal.carbs,
    protein: goal.protein,
  });

  
  return (
    <GoalContext.Provider
      value={{
        goals,
        setGoals,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

GoalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
