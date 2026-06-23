const { convertUnit } = require('../services/conversionService');
const { formatSuccessResponse } = require('../utils/responseFormatter');

const convertMeasurement = (req, res, next) => {
  try {
    const result = convertUnit(req.body);
    return res.status(200).json(formatSuccessResponse(result));
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  convertMeasurement
};
