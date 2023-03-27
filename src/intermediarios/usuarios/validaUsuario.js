const { StatusCodes } = require("http-status-codes");
const joi = require("joi");

const { emailExiste } = require("../../servicos/verificarEmail");
const mensagensErrors = require("../erros/mensagensErros");
const { campos } = require("../transacoes/validarCampos");

const validarCamposUsuario = campos((schema) =>
  schema(
    joi.object({
      nome: joi
        .string()
        .min(3)
        .required()
        .messages({
          "any.required": "O campo valor é obrigatório",
          "string.min": "O campo nome deve conter ao menos 5 caracteres",
        }),

      email: joi.string().email().required().messages({
        "string.base": "O email deve ser do tipo string",
        "any.required": "O campo valor é obrigatório",
        "string.email": "O campo email precisa ser um tipo válido",
      }),
      senha: joi.string().min(5).required().messages({
        "string.base": "A senha deve ser do tipo string",
        "any.required": "O campo valor é obrigatório",
        "string.min": "O campo senha deve conter ao menos 5 caracteres",
      }),
    })
  )
);

const validarUsuario = async (req, res, next) => {
  const { email } = req.body;

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
  validarCamposUsuario,
};
