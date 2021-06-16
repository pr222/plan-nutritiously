import { v4 as uuidv4 } from 'uuid';
import { calculateNutients } from '../utils/calculator';
import FoodItem from './FoodItem';

export default class Ingredient {
  /**
   * @param {Object} foodInfo - Nutrient values per 100g and cost per kg of the FoodItem class.
   * @param {number} amount - Amount in grams.
   */
  constructor(foodInfo, amount) {
    const foodItem = Object.assign(new FoodItem(), foodInfo);

    this.name = foodInfo.name || 'A Food Item';
    this.id = uuidv4();
    this.nutritionPer100g = foodItem.nutrition;
    this.summedNutrition = {
      kcal: 0,
      fats: 0,
      carbohydrates: 0,
      proteins: 0,
    };
    this.amount = amount || 0;
    this.costPerKg = foodItem.costPerKg || 0;
    this.summedCost = 0;

    // Make sure to update at instantiation.
    this.sumNutrition();
    this.sumCost();
  }

  //
  // Public Interface
  //

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
   * Get the summed nutrition of the ingredient.
   * @returns {object} - With all the summed nutrients.
   */
  getSummedNutrition() {
    return this.summedNutrition;
  }

  /**
   * Update amount and change cost and nutrition accordingly.
   *
   * @param {Number} val - change amount of grams.
   */
  updateAmount(val) {
    this.amount = Number(val);
    this.sumCost();
    this.sumNutrition();
  }

  //
  // Private Methods
  //

  /**
   * Update total summed cost with cost per kg and the amount of the food item.
   */
  sumCost() {
    this.summedCost = Number(((this.costPerKg * 0.001) * this.amount).toFixed(2));
  }

  /**
   * Update and sum the total nutrition for the item,
   * calculating from the amount and the per 100g-info.
   */
  sumNutrition() {
    this.summedNutrition.kcal = calculateNutients(this.nutritionPer100g.kcal, this.amount);
    this.summedNutrition.fats = calculateNutients(this.nutritionPer100g.fats, this.amount);
    // eslint-disable-next-line max-len
    this.summedNutrition.carbohydrates = calculateNutients(this.nutritionPer100g.carbohydrates, this.amount);
    this.summedNutrition.proteins = calculateNutients(this.nutritionPer100g.proteins, this.amount);
  }
}
