const LENGTH_FACTORS_IN_METER = {
  meter: 1,
  kilometer: 1000,
  centimeter: 0.01,
  millimeter: 0.001,
  mile: 1609.344,
  yard: 0.9144,
  foot: 0.3048,
  inch: 0.0254
};

const WEIGHT_FACTORS_IN_KILOGRAM = {
  kilogram: 1,
  gram: 0.001,
  milligram: 0.000001,
  pound: 0.45359237,
  ounce: 0.028349523125
};

const TEMPERATURE_UNITS = ['celsius', 'fahrenheit', 'kelvin'];

module.exports = {
  LENGTH_FACTORS_IN_METER,
  WEIGHT_FACTORS_IN_KILOGRAM,
  TEMPERATURE_UNITS
};
