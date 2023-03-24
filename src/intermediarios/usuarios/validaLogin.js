const { StatusCodes } = require("http-status-codes");
const joi = require("joi");

const { emailExiste } = require("../../servicos/verificarEmail");
const mensagensErrors = require("../erros/mensagensErros");
const { comparaSenha } = require("../../metodos/criptografiaSenha");
const { campos } = require("../transacoes/validarCampos");

const validarLogin = async (req, res, next) => {
  const { email, senha } = req.body;
  const erro = () => {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(mensagensErrors.loginUsuarioErro);
  };

  const temCampoNaoPreenchido = campos((schema) =>
    schema(
      joi.object({
        email: joi
          .string()
          .email()
          .required()
          .messages({ "any.required": "O campo valor é obrigatório" }),
        senha: joi
          .string()
          .min(5)
          .required()
          .messages({ "any.required": "O campo valor é obrigatório" }),
      })
    )
  );

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
