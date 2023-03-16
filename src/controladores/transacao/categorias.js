const { consultarTransacoes } = require("../../servicos/consultaTransacoes");

const listarCategorias = async (req, res) => {
  const { rows } = await consultarTransacoes({ categorias: true }); // envia a propriedade categoria para passar na condicional e listar as categorias
  return res.json(rows);
};

module.exports = { listarCategorias };
