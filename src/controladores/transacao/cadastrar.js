const { StatusCodes } = require("http-status-codes");
const { salvarTransacao } = require("../../servicos/cadastro");

const cadastrarTransacao = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  const { rows } = await salvarTransacao(
    descricao,
    valor,
    data,
    categoria_id,
    req.usuario,
    tipo.toLowerCase()
  );

  return res.status(StatusCodes.CREATED).json(rows[0]);
};


module.exports = { cadastrarTransacao }