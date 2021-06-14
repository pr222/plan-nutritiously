import FoodPer100g from './FoodPer100g';
import FoodItem from './FoodItem';

const mockFoodItems = [
  new FoodItem(new FoodPer100g({
    name: 'Tomato',
    kcal: 12,
    fats: 0.2,
    carbohydrates: 3.9,
    proteins: 0.9,
  }), 80),
  new FoodItem(new FoodPer100g({
    name: 'Egg',
    kcal: 155,
    fats: 11,
    carbohydrates: 1.1,
    proteins: 13,
  }), 147),
  new FoodItem(new FoodPer100g({
    name: 'Oil',
    kcal: 884,
    fats: 100,
    carbohydrates: 0,
    proteins: 0,
  }), 14),
  new FoodItem(new FoodPer100g({
    name: 'Rice',
    kcal: 130,
    fats: 0.3,
    carbohydrates: 28,
    proteins: 2.7,
  }), 150),
];

export { mockFoodItems as default };
