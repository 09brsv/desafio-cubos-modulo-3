const { StatusCodes } = require("http-status-codes");
const camposObrigatorios = require("../../metodos/camposObrigatorios");
const { emailExiste } = require("../../servicos/verificarEmail");
const mensagensErrors = require("../erros/mensagensErros");
const { comparaSenha } = require("../../metodos/criptografiaSenha");

const validarLogin = async (req, res, next) => {
  const { email, senha } = req.body;
  const erro = () => {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(mensagensErrors.loginUsuarioErro);
  };

  const temCampoNaoPreenchido = camposObrigatorios({ email, senha });

  if (temCampoNaoPreenchido) {
    return erro();
  }

  const emailValido = await emailExiste(email);
  if (!emailValido) {
    return erro();
  }

  const senhaValida = comparaSenha(senha, emailValido.senha);

  if (senhaValida) {
    req.usuario = emailValido;
    return next();
  }
  return erro();
};

module.exports = { validarLogin };
