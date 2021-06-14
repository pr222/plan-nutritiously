import { v4 as uuidv4 } from 'uuid';
import { calculateNutients } from '../utils/calculator';
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

  /**
   * Update amount and change cost and nutrition accordingly.
   *
   * @param {Number} val - change amount of grams.
   */
  updateAmount(val) {
    this.amount = Number(val);
    this.updateCost();
    this.sumNutrition();
  }

  /**
   * Change cost per kg and update total cost accordingly.
   *
   * @param {Number} val - Cost per kg.
   */
  updateCostPerKg(val) {
    this.costPerKg = val;
    this.updateCost();
  }

  /**
   * Update total summed cost with cost per kg and the amount of the food item.
   */
  updateCost() {
    this.summedCost = ((this.costPerKg * 0.001) * this.amount).toFixed(2);
  }

  /**
   * Update and sum the total nutrition for the item,
   * calculating from the amount and the per 100g-info.
   */
  sumNutrition() {
    //
    // CONVERT TO NUMBER!
    //
    // And maybe make an dedicated function for calculation...
    //
    const testKcal = calculateNutients(this.nutritionPer100g.kcal, this.amount);
    console.log(testKcal);
    this.summedNutrition.kcal = (
      (this.nutritionPer100g.kcal * 0.01) * this.amount).toFixed(2);
    this.summedNutrition.fats = (
      (this.nutritionPer100g.fats * 0.01) * this.amount).toFixed(2);
    this.summedNutrition.carbohydrates = (
      (this.nutritionPer100g.carbohydrates * 0.01) * this.amount).toFixed(2);
    this.summedNutrition.proteins = (
      (this.nutritionPer100g.proteins * 0.01) * this.amount).toFixed(2);

    return this.summedNutrition;
  }
}
