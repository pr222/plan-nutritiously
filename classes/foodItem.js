export default class FoodItem {
  constructor() {
    this.name = '';
    this.kcal = '';
    this.fats = '';
    this.carbohydrates = '';
    this.protein = '';
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getId() {
    return this.id;
  }
}
