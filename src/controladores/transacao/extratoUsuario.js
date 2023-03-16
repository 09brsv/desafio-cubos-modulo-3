const { consultarTransacoes } = require("../../servicos/consultaTransacoes");

const obterExtrato = async (req, res) => {
  const id = req.usuario;
  let entrada = 0;
  let saida = 0;

  const transacao = {
    transacoes: true,
    id: id,
  };

  const { rows } = await consultarTransacoes(transacao);

  for (let i of rows) {
    if (i.tipo == "entrada") {
      entrada += i.valor;
    } else {
      saida += i.valor;
    }
  }

  if (entrada !== 0) {
    entrada = (entrada / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  if (saida !== 0) {
    saida = (saida / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const dados = {
    entrada,
    saida,
  };

  return res.json(dados);
};

module.exports = { obterExtrato }