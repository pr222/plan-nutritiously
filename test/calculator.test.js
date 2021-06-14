const calculator = require('../utils/calculator');

describe('Calculator', () => {
  describe('Sum', () => {
    test('1 + 2 should equal 3', () => {
      expect(calculator.sum(1, 2)).toBe(3);
    });
  });
  describe('Calculate nutrientsPer100g multiplied with amount', () => {
    // Expected outputs
    describe('With expected arguments', () => {
      test('30 per100g and 50 amount should return 15', () => {
        expect(calculator.calculateNutients(30, 50)).toBe(15);
      });

      test('An empty string per100g and 50 amount should return 0', () => {
        expect(calculator.calculateNutients('', 50)).toBe(0);
      });
      test('40 per100g and an empty string amount should return 0', () => {
        expect(calculator.calculateNutients(40, '')).toBe(0);
      });
    });

    // Error-trowing
    describe('With error-inducing agruments', () => {
      test('10 per100g and a string with number 8 amount should throw an error', () => {
        expect(() => {
          calculator.calculateNutients(10, '8');
        }).toThrow('One of the arguments is not a number');
      });
      test('A string of number 10 per100g and 8 amount should throw an error', () => {
        expect(() => {
          calculator.calculateNutients('10', 8);
        }).toThrow('One of the arguments is not a number');
      });

      test('A string of ABC per100g and 8 amount should throw an error', () => {
        expect(() => {
          calculator.calculateNutients('ABC', 8);
        }).toThrow('One of the arguments is not a number');
      });
      test('10 per100g and a string of ABC amount should throw an error', () => {
        expect(() => {
          calculator.calculateNutients(10, 'ABC');
        }).toThrow('One of the arguments is not a number');
      });

      test('Undefined per100g and 8 amount should throw an error', () => {
        expect(() => {
          calculator.calculateNutients(undefined, 8);
        }).toThrow('One of the arguments is not a number');
      });
      test('10 per100g and undefined amount should throw an error', () => {
        expect(() => {
          calculator.calculateNutients(10, undefined);
        }).toThrow('One of the arguments is not a number');
      });

      test('NaN per100g and 8 amount should throw an error', () => {
        expect(() => {
          calculator.calculateNutients(NaN, 8);
        }).toThrow('One of the arguments is not a number');
      });
      test('10 per100g and NaN amount should throw an error', () => {
        expect(() => {
          calculator.calculateNutients(10, NaN);
        }).toThrow('One of the arguments is not a number');
      });

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
