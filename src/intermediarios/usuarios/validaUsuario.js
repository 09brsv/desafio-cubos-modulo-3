const { StatusCodes } = require("http-status-codes");
const camposObrigatorios = require("../../metodos/camposObrigatorios");
const { emailExiste } = require("../../servicos/verificarEmail");
const mensagensErrors = require("../erros/mensagensErros");

const validarUsuario = async (req, res, next) => {
  const { nome, email, senha } = req.body;

  const temCampoNaoPreenchido = camposObrigatorios({ nome, email, senha });

  if (temCampoNaoPreenchido) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ mensagem: temCampoNaoPreenchido });
  }

  const emailInvalido = await emailExiste(email);
  if (emailInvalido) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(mensagensErrors.cadastroUsuárioErro);
  }

  next();
};

module.exports = {
  validarUsuario,
};
