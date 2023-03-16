const { StatusCodes } = require("http-status-codes");
const { verify } = require("jsonwebtoken");
const mensagensErros = require("../erros/mensagensErros");

const autenticar = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(mensagensErros.verificarTokenErro);
  }

  const token = authorization.split(" ")[1];
  try {
    const { id } = verify(token, process.env.SECRET_KEY);

    req.usuario = id;

    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(mensagensErros.verificarTokenErro);
  }
};

module.exports = { autenticar };
