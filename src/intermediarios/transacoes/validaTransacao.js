const { StatusCodes } = require("http-status-codes");
const joi = require("joi");

const camposObrigatorios = require("../../metodos/camposObrigatorios");
const mensagensErrors = require("../erros/mensagensErros");
const { tipoTransacaoValida } = require("../../metodos/tipoTransacao");
const { consultarTransacoes } = require("../../servicos/consultaTransacoes");
const { campos } = require("./validarCampos");
const mensagensErros = require("../erros/mensagensErros");

const validarCamposTransacao = campos((schema) =>
  schema(
    joi.object({
      descricao: joi
        .string()
        .required()
        .messages({ "any.required": "O campo descrição é obrigatório" }),
      valor: joi.number().positive().required().messages({
        "any.required": "O campo valor é obrigatório",
        "number.positive": "O valor precisa ser um número positivo",
        "number.base": "O valor precisa ser um número",
      }),
      data: joi
        .date()
        .required()
        .messages({ "any.required": "O campo data é obrigatório" }),
      tipo: joi
        .string()
        .equal("entrada", "saida", "saída")
        .required()
        .messages({
          "any.required": "O campo tipo é obrigatório",
          "any.only": "O tipo precisa ser entrada ou saída",
        }),
      categoria_id: joi.number().positive().required().messages({
        "any.required": "O campo categoria_id é obrigatório",
        "number.positive": "O valor precisa ser um número positivo",
        "number.base": "O valor precisa ser um número",
      }),
    })
  )
);
const validarTransacao = async (req, res, next) => {
  const { valor, categoria_id, tipo } = req.body;

  if (temCampoNaoPreenchido) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ mensagem: temCampoNaoPreenchido });
  }

  if (valor <= 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(mensagensErros.ValorInvalido);
  }

  if (!tipoTransacaoValida(tipo)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(mensagensErrors.tipoTransacaoErro);
  }

  const { rows } = await consultarTransacoes({
    idCategoria: categoria_id,
  });

  if (!rows[0]) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(mensagensErrors.categoriaTransacaoErro);
  }

  if (req.params.id) {
    const resultado = await consultarTransacoes({
      idTransacao: req.params.id,
      id: req.usuario,
    });

    if (resultado instanceof Error) {
      return res.status(StatusCodes.BAD_REQUEST).json(resultado.message);
    }
    if (!resultado.rows[0])
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(mensagensErrors.detalharUmaTransacaoErro);
  }

  next();
};

const validarIdTransacao = (req, res, next) => {
  if (isNaN(req.params.id))
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(mensagensErrors.detalharUmaTransacaoErro);
  next();
};

module.exports = {
  validarTransacao,
  validarIdTransacao,
  validarCamposTransacao,
};
