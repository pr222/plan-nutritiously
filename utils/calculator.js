/**
 * Calculate how much nutrients are in the amount in relation to nutrient data per100g.
 *
 * @param {number} per100g - The nutrition-data per 100g.
 * @param {number} amount - The amount of nutrient in grams.
 * @throws {error} - when arguments cannot be converted to numbers, is NaN or a negative number
 * @returns {number} - the calculated result.
 */
const calculateNutients = (per100g, amount) => {
  // Try converting to a number.
  const nutrientInfo = Number(per100g);
  const ingredientAmount = Number(amount);

  if (typeof nutrientInfo !== 'number' || typeof ingredientAmount !== 'number') {
    throw new Error('One of the arguments cannot be converted to a useful number');
  }

  if (Number.isNaN(nutrientInfo) || Number.isNaN(ingredientAmount)) {
    throw new Error('One of the arguments cannot be converted to a useful number');
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
