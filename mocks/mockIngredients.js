import FoodItem from '../classes/FoodItem';
import Ingredient from '../classes/Ingredient';

const mockFoodItems = [
  new Ingredient(new FoodItem({
    name: 'Tomato',
    kcal: 12,
    fats: 0.2,
    carbohydrates: 3.9,
    proteins: 0.9,
    costPerKg: 39.95,
  }), 80),
  new Ingredient(new FoodItem({
    name: 'Egg',
    kcal: 155,
    fats: 11,
    carbohydrates: 1.1,
    proteins: 13,
    costPerKg: 53.84,
  }), 147),
  new Ingredient(new FoodItem({
    name: 'Oil',
    kcal: 884,
    fats: 100,
    carbohydrates: 0,
    proteins: 0,
    costPerKg: 22.17,
  }), 14),
  new Ingredient(new FoodItem({
    name: 'Rice',
    kcal: 130,
    fats: 0.3,
    carbohydrates: 28,
    proteins: 2.7,
    costPerKg: 22.98,
  }), 150),
];

export { mockFoodItems as default };
