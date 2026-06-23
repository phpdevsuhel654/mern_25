const {
  LENGTH_FACTORS_IN_METER,
  WEIGHT_FACTORS_IN_KILOGRAM,
  TEMPERATURE_UNITS
} = require('../utils/conversionFactors');
const AppError = require('../utils/AppError');

const CATEGORY_UNITS = {
  length: Object.keys(LENGTH_FACTORS_IN_METER),
  weight: Object.keys(WEIGHT_FACTORS_IN_KILOGRAM),
  temperature: TEMPERATURE_UNITS
};

const validateConversionRequest = (req, res, next) => {
  const { category, fromUnit, toUnit, value } = req.body;

  const normalizedCategory = String(category || '').trim().toLowerCase();
  const normalizedFromUnit = String(fromUnit || '').trim().toLowerCase();
  const normalizedToUnit = String(toUnit || '').trim().toLowerCase();
  const normalizedValue = Number(value);

  if (!category || !fromUnit || !toUnit || value === undefined) {
    return next(new AppError('category, fromUnit, toUnit and value are required', 400));
  }

  if (!CATEGORY_UNITS[normalizedCategory]) {
    return next(new AppError('Invalid category', 400));
  }

  if (!CATEGORY_UNITS[normalizedCategory].includes(normalizedFromUnit)) {
    return next(new AppError('Invalid fromUnit for selected category', 400));
  }

  if (!CATEGORY_UNITS[normalizedCategory].includes(normalizedToUnit)) {
    return next(new AppError('Invalid toUnit for selected category', 400));
  }

  if (!Number.isFinite(normalizedValue)) {
    return next(new AppError('value must be a valid number', 400));
  }

  req.body = {
    category: normalizedCategory,
    fromUnit: normalizedFromUnit,
    toUnit: normalizedToUnit,
    value: normalizedValue
  };

  next();
};

module.exports = validateConversionRequest;
