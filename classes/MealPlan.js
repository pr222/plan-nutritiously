import { v4 as uuidv4 } from 'uuid';

export default class MealPlan {
  constructor(name) {
    this.name = name;
    this.id = uuidv4();
    this.foodItems = [];
  }

  addFoodItem(item) {
    this.foodItems.push(item);
  }

  editFoodItem(item) {
    // Replace next line, Find index of item with its id
    this.foodItems.findIndex(item);
    // Split in the new item.
  }

  deleteFoodItem(item) {
    // Replace next line, find index and remove from array.
    this.deleteFoodItem(item);
  }
}
