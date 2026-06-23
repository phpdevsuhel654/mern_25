const { convertUnit } = require('../services/conversionService');

describe('convertUnit service', () => {
  it('should convert weight from kilogram to gram', () => {
    const result = convertUnit({
      category: 'weight',
      fromUnit: 'kilogram',
      toUnit: 'gram',
      value: 2
    });

    expect(result).toBe(2000);
  });

  it('should convert temperature from celsius to fahrenheit', () => {
    const result = convertUnit({
      category: 'temperature',
      fromUnit: 'celsius',
      toUnit: 'fahrenheit',
      value: 0
    });

    expect(result).toBe(32);
  });
});
