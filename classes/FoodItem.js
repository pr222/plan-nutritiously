import { v4 as uuidv4 } from 'uuid';

/**
 * A class containting nutritional information per 100g and cost per kg.
 */
export default class FoodItem {
  constructor(aFood) {
    this.name = aFood ? aFood.name : 'A Food Per 100g';
    this.id = uuidv4();
    this.nutrition = {
      kcal: aFood ? aFood.kcal : 0,
      fats: aFood ? aFood.fats : 0,
      carbohydrates: aFood ? aFood.carbohydrates : 0,
      proteins: aFood ? aFood.proteins : 0,
    };
    this.costPerKg = aFood ? aFood.costPerKg : 0;
  }

  get kcal() {
    return this.nutrition.kcal;
  }

  set kcal(val) {
    this.nutrition.kcal = Number(val);
  }

  get fats() {
    return this.nutrition.fats;
  }

  set fats(val) {
    this.nutrition.fats = Number(val);
  }

  get carbohydrates() {
    return this.nutrition.carbohydrates;
  }

  set carbohydrates(val) {
    this.nutrition.carbohydrates = Number(val);
  }

  get proteins() {
    return this.nutrition.proteins;
  }

  set proteins(val) {
    this.nutrition.proteins = Number(val);
  }
}
