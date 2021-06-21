import FoodItem from '../classes/FoodItem';

const mockFoodItems = [
  new FoodItem({
    name: 'Tomato',
    kcal: 12,
    fats: 0.2,
    carbohydrates: 3.9,
    proteins: 0.9,
    costPerKg: 39.95,
  }),
  new FoodItem({
    name: 'Egg',
    kcal: 155,
    fats: 11,
    carbohydrates: 1.1,
    proteins: 13,
    costPerKg: 53.84,
  }),
  new FoodItem({
    name: 'Oil',
    kcal: 884,
    fats: 100,
    carbohydrates: 0,
    proteins: 0,
    costPerKg: 22.17,
  }),
  new FoodItem({
    name: 'Rice',
    kcal: 130,
    fats: 0.3,
    carbohydrates: 28,
    proteins: 2.7,
    costPerKg: 22.98,
  }),
];

export { mockFoodItems as default };
