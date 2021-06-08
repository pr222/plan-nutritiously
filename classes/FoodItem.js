import { v4 as uuidv4 } from 'uuid';
import FoodPer100g from './FoodPer100g';

export default class FoodItem {
  /**
   * @param {Object} foodInfo - of the class FoodPer100g.
   * @param {number} amount - Amount in grams.
   * @param {number} costPerKg - Cost per kilogram.
   */
  constructor(foodInfo, amount, costPerKg) {
    this.name = foodInfo.name || 'A Food Item';
    this.id = uuidv4();
    this.custom = false;
    this.nutritionPer100g = Object.assign(new FoodPer100g(), foodInfo);
    this.summedNutrition = {
      kcal: 0,
      fats: 0,
      carbohydrates: 0,
      proteins: 0,
    };
    this.amount = amount || 0;
    this.costPerKg = costPerKg || 0;
    this.summedCost = 0;

    // Make sure summedNutrition gets updated at instantiation.
    this.sumNutrition();
  }

  get kcal() {
    return this.summedNutrition.kcal;
  }

  get fats() {
    return this.summedNutrition.fats;
  }

  get carbohydrates() {
    return this.summedNutrition.carbohydrates;
  }

  get proteins() {
    return this.summedNutrition.proteins;
  }

  get amount() {
    return this.amount;
  }

  set amount(val) {
    this.amount = val;
    this.updateCost();
    this.sumNutrition();
  }

  get summedCost() {
    return this.summedCost;
  }

  get costPerKg() {
    return this.costPerKg;
  }

  set costPerKg(val) {
    this.costPerKg = Number(val);
    this.updateCost();
  }

  updateCost() {
    this.summedCost = (this.costPerKg * 0.001) * this.amount;
  }

  static sumNutrition() {
    this.summedNutrition.kcal = (this.nutritionPer100g.kcal * 0.01) * this.amount;
    this.sumNutrition.fats = (this.nutritionPer100g.fats * 0.01) * this.amount;
    this.sumNutrition.carbohydrates = (this.nutritionPer100g.carbohydrates * 0.01) * this.amount;
    this.sumNutrition.proteins = (this.nutritionPer100g.proteins * 0.01) * this.amount;
  }
}
