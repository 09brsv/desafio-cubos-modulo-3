const { StatusCodes } = require("http-status-codes");
const joi = require("joi");

const { emailExiste } = require("../../servicos/verificarEmail");
const mensagensErrors = require("../erros/mensagensErros");
const { comparaSenha } = require("../../metodos/criptografiaSenha");
const { campos } = require("../transacoes/validarCampos");

const validarCamposLogin = campos((schema) =>
  schema(
    joi.object({
      email: joi
        .string()
        .email()
        .required()
        .messages({
          "string.base": "O email deve ser do tipo string",
          "any.required": "O campo valor é obrigatório",
          "string.email": "O campo email precisa ser um tipo válido",
        }),
      senha: joi
        .string()
        .min(5)
        .required()
        .messages({
          "string.base": "A senha deve ser do tipo string",
          "any.required": "O campo valor é obrigatório",
          "string.min": "O campo senha deve conter ao menos 5 caracteres",
        }),
    })
  )
);

const validarLogin = async (req, res, next) => {
  const { email, senha } = req.body;
  const erro = () => {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(mensagensErrors.loginUsuarioErro);
  };

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

module.exports = { validarLogin, validarCamposLogin };
