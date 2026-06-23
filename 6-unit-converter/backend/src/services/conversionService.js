const {
  LENGTH_FACTORS_IN_METER,
  WEIGHT_FACTORS_IN_KILOGRAM
} = require('../utils/conversionFactors');

const roundResult = (value) => Number(value.toFixed(10));

const convertLength = (fromUnit, toUnit, value) => {
  const valueInMeter = value * LENGTH_FACTORS_IN_METER[fromUnit];
  const convertedValue = valueInMeter / LENGTH_FACTORS_IN_METER[toUnit];
  return roundResult(convertedValue);
};

const convertWeight = (fromUnit, toUnit, value) => {
  const valueInKilogram = value * WEIGHT_FACTORS_IN_KILOGRAM[fromUnit];
  const convertedValue = valueInKilogram / WEIGHT_FACTORS_IN_KILOGRAM[toUnit];
  return roundResult(convertedValue);
};

const toCelsius = (unit, value) => {
  if (unit === 'celsius') return value;
  if (unit === 'fahrenheit') return (value - 32) * (5 / 9);
  return value - 273.15;
};

const fromCelsius = (unit, value) => {
  if (unit === 'celsius') return value;
  if (unit === 'fahrenheit') return value * (9 / 5) + 32;
  return value + 273.15;
};

const convertTemperature = (fromUnit, toUnit, value) => {
  const celsiusValue = toCelsius(fromUnit, value);
  const convertedValue = fromCelsius(toUnit, celsiusValue);
  return roundResult(convertedValue);
};

const convertUnit = ({ category, fromUnit, toUnit, value }) => {
  if (category === 'length') {
    return convertLength(fromUnit, toUnit, value);
  }

  if (category === 'weight') {
    return convertWeight(fromUnit, toUnit, value);
  }

  return convertTemperature(fromUnit, toUnit, value);
};

module.exports = {
  convertUnit
};
