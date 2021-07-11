import { v4 as uuidv4 } from 'uuid';

/**
 * Class that acts as a container for a list of ingredients
 */
export default class MealPlan {
  constructor(name) {
    this.name = name;
    this.id = uuidv4();
    this.ingredients = [];
    this.totalCost = 0;
    this.totalNutrients = {
      kcal: 0,
      fats: 0,
      carbohydrates: 0,
      proteins: 0,
    };

    this.countTotalCost();
    this.countTotalNutrients();
  }

  //
  // Public Interface
  //

  /**
   * Add a new ingredient to the meal plan.
   *
   * @param {object} newItem - an Ingredient object
   */
  addIngredient(newItem) {
    this.ingredients.push(newItem);

    // Update Meal Plan
    this.countTotalCost();
    this.countTotalNutrients();
  }

  /**
   * Find index of corresponding ingredient and
   * replace it with the edited one.
   *
   * @param {object} editedItem - an Ingredient object.
   */
  replaceIngredient(editedItem) {
    const index = this.ingredients.findIndex((elem) => elem.id === editedItem.id);

    this.ingredients.splice(index, 1, editedItem);

    // Update Meal Plan
    this.countTotalCost();
    this.countTotalNutrients();
  }

  /**
   * Find index of corresponding ingredient and remove it.
   *
   * @param {object} itemToDelete - an Ingredient object.
   */
  deleteIngredient(itemToDelete) {
    const index = this.ingredients.findIndex((elem) => elem.id === itemToDelete.id);

    this.ingredients.splice(index, 1);

    // Update Meal Plan
    this.countTotalCost();
    this.countTotalNutrients();
  }

  //
  // Private Methods
  //

  /**
   * Update the total cost counting the cost of all ingredients.
   */
  countTotalCost() {
    const costs = [];

    this.ingredients.forEach((elem) => {
      costs.push(elem.summedCost);
    });

    const newCost = costs.reduce((prev, curr) => prev + curr, 0);
    this.totalCost = Number(newCost.toFixed(2));
    // console.log('TOTAL COST', this.totalCost);
  }

  /**
   * Update the total sum of nutrients of all ingredients.
   */
  countTotalNutrients() {
    let newKcal = 0;
    let newFats = 0;
    let newCarbohydrates = 0;
    let newProteins = 0;

    this.ingredients.forEach((elem) => {
      newKcal += elem.summedNutrition.kcal;
      newFats += elem.summedNutrition.fats;
      newCarbohydrates += elem.summedNutrition.carbohydrates;
      newProteins += elem.summedNutrition.proteins;
    });

    this.totalNutrients.kcal = Number(newKcal.toFixed(2));
    this.totalNutrients.fats = Number(newFats.toFixed(2));
    this.totalNutrients.carbohydrates = Number(newCarbohydrates.toFixed(2));
    this.totalNutrients.proteins = Number(newProteins.toFixed(2));
  }
}
