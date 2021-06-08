import { v4 as uuidv4 } from 'uuid';

export default class FoodPer100g {
  constructor(aFood) {
    this.name = aFood ? aFood.name : 'A Food Per 100g';
    this.id = uuidv4();
    this.nutrition = {
      kcal: aFood ? aFood.kcal : 0,
      fats: aFood ? aFood.fats : 0,
      carbohydrates: aFood ? aFood.carbohydrates : 0,
      proteins: aFood ? aFood.proteins : 0,
    };
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

  /**
   * Set all nutritional info providing an object.
   * It should have all properties flat on the same level.
   *
   * @param {Object} food - An object
   */
  setInformation(food) {
    if (food.name) {
      this.name = food.name;
    }
    if (food.kcal) {
      this.nutrition.kcal = Number(food.kcal);
    }
    if (food.fats) {
      this.nutrition.fats = Number(food.fats);
    }
    if (food.carbohydrates) {
      this.nutrition.carbohydrates = Number(food.carbohydrates);
    }
    if (food.proteins) {
      this.nutrition.proteins = Number(food.proteins);
    }
  }
}
