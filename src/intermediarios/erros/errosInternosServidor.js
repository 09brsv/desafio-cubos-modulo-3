const { StatusCodes } = require("http-status-codes");

const errosServidor = (error, req, res, next) => {
  console.log(error);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
};

module.exports = { errosServidor }
