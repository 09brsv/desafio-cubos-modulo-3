const { StatusCodes } = require("http-status-codes");
const { consultarTransacoes } = require("../../servicos/consultaTransacoes");
const mensagensErros = require("../../intermediarios/erros/mensagensErros");

const transacaoUsuario = async (req, res) => {
  let transacao;

  if (req.query.filtro) {
    transacao = await consultarTransacoes({
      filtro: req.query.filtro,
      id: req.usuario,
    });
    if (!transacao.rows[0]) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(mensagensErros.detalharUmaTransacaoErro);
    }
  } else {
    const transacoes = {
      id: req.usuario,
      transacoes: true,
    };

    transacao = await consultarTransacoes(transacoes);
  }

  return res.json(transacao.rows);
};

const transacaoId = async (req, res) => {
  const { id } = req.params;

  const transacao = {
    idTransacao: id,
    id: req.usuario,
  };

  const { rows, rowCount } = await consultarTransacoes(transacao);

  if (rowCount < 1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(mensagensErros.detalharUmaTransacaoErro);
  }

  return res.json(rows[0]);
};


module.exports = {
  transacaoUsuario,
  transacaoId
};
