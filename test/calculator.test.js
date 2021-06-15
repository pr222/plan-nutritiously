const calculator = require('../utils/calculator');

describe('Calculator', () => {
  describe('Sum', () => {
    test('1 + 2 should equal 3', () => {
      expect(calculator.sum(1, 2)).toBe(3);
    });
  });
  describe('Calculate nutrientsPer100g multiplied with amount', () => {
    describe('Arguments giving expected results', () => {
      describe('Decimal-handling', () => {
        test('30 per100g and 50 amount should return 15 \n \t - Expected precise result of 15 without decimals', () => {
          expect(calculator.calculateNutients(30, 50)).toBe(15);
        });
        test('25.01 per100g and 102 amount should return 25.51 \n \t - Expected 25.5102 to be rounded down to two decimals', () => {
          expect(calculator.calculateNutients(25.01, 102)).toBe(25.51);
        });
        test('3.3 per100g and 33.33 amount should return 1.1 \n \t - Expected 1.09989 to round up to only 1 decimal', () => {
          expect(calculator.calculateNutients(3.3, 33.33)).toBe(1.1);
        });
      });
      describe('Rounding within decimals', () => {
        test('6.2 per100g and 78 amount should return 4.84 \n \t - Expected 4.836 to let >5 round up', () => {
          expect(calculator.calculateNutients(6.2, 78)).toBe(4.84);
        });
        test('3.3 per100g and 21.05 amount should return 0.69 \n \t - Expected 0.69465 to let <5 round down', () => {
          expect(calculator.calculateNutients(3.3, 21.05)).toBe(0.69);
        });
        test('63.59 per100g and 45 amount should return 28.62 \n \t - Expected 28.6155 with 5 to round up', () => {
          expect(calculator.calculateNutients(63.59, 45)).toBe(28.62);
        });
      });
      describe('With number 0', () => {
        test('0 per100g and 50 amount should return 0', () => {
          expect(calculator.calculateNutients(0, 50)).toBe(0);
        });
        test('40 per100g and 0 should return 0', () => {
          expect(calculator.calculateNutients(40, 0)).toBe(0);
        });
      });
      describe('Handling number-strings', () => {
        test('An empty string per100g and 50 amount should return 0', () => {
          expect(calculator.calculateNutients('', 50)).toBe(0);
        });
        test('40 per100g and an empty string amount should return 0', () => {
          expect(calculator.calculateNutients(40, '')).toBe(0);
        });
        test('A string of number 8 per100g and 50 amount should return 4', () => {
          expect(calculator.calculateNutients('8', 50)).toBe(4);
        });
        test('40 per100g and a string of number 8 amount should return 3.2', () => {
          expect(calculator.calculateNutients(40, '8')).toBe(3.2);
        });
      });
    });

    describe('Arguments that cause errors to throw', () => {
      describe('Strings', () => {
        test('A string of ABC per100g and 8 amount should throw an error', () => {
          expect(() => {
            calculator.calculateNutients('ABC', 8);
          }).toThrow('One of the arguments cannot be converted to a useful number');
        });
        test('10 per100g and a string of ABC amount should throw an error', () => {
          expect(() => {
            calculator.calculateNutients(10, 'ABC');
          }).toThrow('One of the arguments cannot be converted to a useful number');
        });
      });
      describe('Undefined', () => {
        test('Undefined per100g and 8 amount should throw an error', () => {
          expect(() => {
            calculator.calculateNutients(undefined, 8);
          }).toThrow('One of the arguments cannot be converted to a useful number');
        });
        test('10 per100g and undefined amount should throw an error', () => {
          expect(() => {
            calculator.calculateNutients(10, undefined);
          }).toThrow('One of the arguments cannot be converted to a useful number');
        });
      });
      describe('NaN', () => {
        test('NaN per100g and 8 amount should throw an error', () => {
          expect(() => {
            calculator.calculateNutients(NaN, 8);
          }).toThrow('One of the arguments cannot be converted to a useful number');
        });
        test('10 per100g and NaN amount should throw an error', () => {
          expect(() => {
            calculator.calculateNutients(10, NaN);
          }).toThrow('One of the arguments cannot be converted to a useful number');
        });
      });
      describe('Negative numbers', () => {
        test('-10 per100g and 30 amount should throw an error', () => {
          expect(() => {
            calculator.calculateNutients(-10, 30);
          }).toThrow('One of the arguments are less than zero');
        });
        test('10 per100g and -30 amount should throw an error', () => {
          expect(() => {
            calculator.calculateNutients(10, -30);
          }).toThrow('One of the arguments are less than zero');
        });
      });
    });
  });
});
