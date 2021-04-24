import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

export const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  // let goal;
  // if (localStorage) {
  //   console.log('LOCAL!');
  //   goal = window.localStorage.getItem('goalKcal');
  // }
  // const [goals, setGoals] = useState({
  //   kcal: '',
  //   fat: '',
  //   carbs: '',
  //   protein: '',
  // });
  const [kcal, setKcal] = useState('');
  const [fat, setFat] = useState('');
  const [carbs, setCarbs] = useState('');
  const [protein, setProtein] = useState('');
  // const [goals, setGoals] = useState([]);

  return (
    <GoalContext.Provider
      value={{
        // goals,
        // setGoals,
        kcal,
        fat,
        carbs,
        protein,
        setKcal,
        setFat,
        setCarbs,
        setProtein,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

// export async function getStaticProps() {
//   // if (localStorage) {
//   //   console.log('LOCAL!');
//   // }
//   return { props: {} };
// }

GoalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
