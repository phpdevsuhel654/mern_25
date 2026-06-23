const formatSuccessResponse = (result) => {
  return {
    success: true,
    result
  };
};

const formatErrorResponse = (message) => {
  return {
    success: false,
    message
  };
};

module.exports = {
  formatSuccessResponse,
  formatErrorResponse
};
