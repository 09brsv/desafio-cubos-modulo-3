const { StatusCodes } = require("http-status-codes");
const camposObrigatorios = require("../../metodos/camposObrigatorios");
const mensagensErrors = require("../erros/mensagensErros");
const { tipoTransacaoValida } = require("../../metodos/tipoTransacao");
const { consultarTransacoes } = require("../../servicos/consultaTransacoes");
const mensagensErros = require("../erros/mensagensErros");

const validarTransacao = async (req, res, next) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  const temCampoNaoPreenchido = camposObrigatorios({
    descricao,
    valor,
    data,
    categoria_id,
    tipo,
  });

  if (temCampoNaoPreenchido) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ mensagem: temCampoNaoPreenchido });
  }

  if (valor <= 0) {
    return res.status(StatusCodes.BAD_REQUEST).json(mensagensErros.ValorInvalido)
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
  if (isNaN(req.params.id)) return res.status(StatusCodes.BAD_REQUEST).json(mensagensErrors.detalharUmaTransacaoErro)
  next();
}

module.exports = {
  validarTransacao,
  validarIdTransacao
};
