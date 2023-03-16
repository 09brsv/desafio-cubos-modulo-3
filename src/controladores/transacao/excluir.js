const { consultarTransacoes } = require("../../servicos/consultaTransacoes");
const { StatusCodes } = require("http-status-codes");
const mensagensErros = require("../../intermediarios/erros/mensagensErros");


const excluirTransacao = async (req, res) => {
  const { id } = req.params;

  const transacao = {
    excluirTransacoes: id,
    id: req.usuario,
  };
  const { rowCount } = await consultarTransacoes(transacao);

  if (rowCount < 1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(mensagensErros.detalharUmaTransacaoErro);
  }
  return res.status(StatusCodes.NO_CONTENT).json();
};

module.exports = { excluirTransacao }