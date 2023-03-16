const { StatusCodes } = require("http-status-codes");
const { atualizarTransacao } = require("../../servicos/atualizar");

const atualizar = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  const novaTransacao = {
    descricao,
    valor,
    data,
    categoria_id,
    usuario_id: req.usuario,
    tipo: tipo.toLowerCase(),
    id: req.params.id,
  };

  await atualizarTransacao(novaTransacao);
  return res.status(StatusCodes.NO_CONTENT).send();
};

module.exports = { atualizar }
