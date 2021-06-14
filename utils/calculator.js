/**
 * Calculate how much nutrients are in the amount in relation to nutrient data per100g.
 *
 * @param {number} per100g - The nutrition-data per 100g.
 * @param {number} amount - The amount of nutrient in grams.
 * @returns {number} - the calculated result.
 */
const calculateNutients = (per100g, amount) => {
  let nutrientInfo = per100g;
  let ingredientAmount = amount;

  if (typeof nutrientInfo !== 'number' || typeof ingredientAmount !== 'number') {
    // Empty strings gets assigned to 0, othervise throw error.
    if (typeof nutrientInfo === 'string' || typeof ingredientAmount === 'string') {
      if (typeof nutrientInfo === 'string') {
        if (nutrientInfo.length === 0) {
          nutrientInfo = 0;
        } else {
          throw new Error('One of the arguments is not a number');
        }
      }
      if (typeof ingredientAmount === 'string') {
        if (ingredientAmount.length === 0) {
          ingredientAmount = 0;
        } else {
          throw new Error('One of the arguments is not a number');
        }
      }
    } else {
      throw new Error('One of the arguments is not a number');
    }
  }

  if (Number.isNaN(nutrientInfo) || Number.isNaN(ingredientAmount)) {
    throw new Error('One of the arguments is not a number');
  }

  if (nutrientInfo < 0 || ingredientAmount < 0) {
    throw new Error('One of the arguments are less than zero');
  }

  return Number(((nutrientInfo * 0.01) * ingredientAmount).toFixed(2));
};

const sum = (a, b) => a + b;

module.exports = {
  sum,
  calculateNutients,
};
